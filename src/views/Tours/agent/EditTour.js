import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { API_URL } from "API_URL";
// reactstrap components
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Form,
  Input,
  InputGroup,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";
import swal from 'sweetalert2';
import LinearProgress from '@material-ui/core/LinearProgress';
// core components
import HeaderEmtry from "components/Headers/HeaderEmtry";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditTour = (props) => {

    const [checkProcess, setCheckProcess] = useState(true);
    const [tourName, setTourName] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');
    const [type, setType] = useState('');
    const [star, setStar] = useState('');
    const [email, setEmail] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [photo, setPhoto] = useState([]);
    const [destinationMP1, setDestinationMP1] = useState('');
    const [detailMP1, setDetailMP1] = useState('');
    const [photoMP1, setPhotoMP1] = useState([]);
    const [destinationMP2, setDestinationMP2] = useState('');
    const [detailMP2, setDetailMP2] = useState('');
    const [photoMP2, setPhotoMP2] = useState([]);
    const [highlight, setHighlight] = useState('');
    const [content, setContent] = useState('');
    const [includes, setIncludes] = useState('');
    const [excludes, setExcludes] = useState('');
    const [youNeedToKnow, setYouNeedToKnow] = useState('');
    const [howToTravel, setHowToTravel] = useState('');
    const [cancellationPolicy, setCancellationPolicy] = useState('');

    const [photoList, setPhotoList] = useState([]);
    const [photoListMP1, setPhotoListMP1] = useState([]);
    const [photoListMP2, setPhotoListMP2] = useState([]);
    const [newPreviewImg, setNewPreviewImg] = useState('');
    const [idDataTour, setIdDataTour] = useState('');
    const [altPreviewImg, setAltPreviewImg] = useState('');
    const [titlePreviewImg, setTitlePreviewImg] = useState('');
    const [desPreviewImg, setDesPreviewImg] = useState('');
    const [showModalPreview, setShowModalPreview] = useState(false);
    const [showModalPhoto, setShowModalPhoto] = useState(false);
    
    const [idPhotoEdit, setIdPhotoEdit] = useState('');
    const [namePhoto, setNamePhoto] = useState('');
    const [newNamePhoto, setNewNamePhoto] = useState('');
    const [altPhoto, setAltPhoto] = useState('');
    const [titlePhoto, setTitlePhoto] = useState('');
    const [descriptionPhoto, setDescriptionPhoto] = useState('');

    const [showModalPhotoMP1, setShowModalPhotoMP1] = useState(false);
    const [showModalPhotoMP2, setShowModalPhotoMP2] = useState(false);

    const history = useHistory();

    useEffect(() => {
        if((Boolean(localStorage.getItem('status')) && Boolean(localStorage.getItem('token'))) && (localStorage.getItem('status') !== '' && localStorage.getItem('token') !== '')) {
            setIdDataTour(props.match.params.id_data_tour);
            updateDataTour();
        }
        else {
          history.push('/auth/login');
        }
    }, [])

    const updateDataTour = async () => {
        setCheckProcess(true);
        try {
            const res_getDataTour = await fetch(`${API_URL}/api/tour/getTour/${props.match.params.id_data_tour}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res_getDataTour.ok) {
                const r_getDataTour = await res_getDataTour.json();
                if (r_getDataTour.status === 1) {
                    const tour = r_getDataTour.dataTour[0];
                    setTourName(tour.tour_name);
                    setAddress(tour.tour_address);
                    setContact(tour.tour_contact_number);
                    setType(tour.type);
                    setStar(tour.star);
                    setEmail(tour.tour_email);
                    setPreviewImage(tour.preview_img_name);
                    setDestinationMP1(tour.meeting_p_1);
                    setDetailMP1(tour.detail_meeting_p_1);
                    setDestinationMP2(tour.meeting_p_2);
                    setDetailMP2(tour.detail_meeting_p_2);
                    setHighlight(`${tour.highlight}`);
                    setContent(tour.content);
                    setIncludes(tour.includes);
                    setExcludes(tour.excludes);
                    setYouNeedToKnow(tour.you_need_to_know);
                    setHowToTravel(tour.how_to_travel);
                    setCancellationPolicy(tour.cancellation_policy);
                    setAltPreviewImg(tour.alt_preview_img);
                    setTitlePreviewImg(tour.title_preview_img);
                    setDesPreviewImg(tour.description_preview_img);

                    photoList.splice(0, photoList.length);
                    for(let i = 0; i < r_getDataTour.dataImg.length; i++) {
                        const id_img = r_getDataTour.dataImg[i].id_img_data_tour;
                        const name_img = r_getDataTour.dataImg[i].name_img_data_tour;
                        const alt_img = r_getDataTour.dataImg[i].alt_img_data_tour;
                        const description_img = r_getDataTour.dataImg[i].description_img_data_tour;
                        const title_img = r_getDataTour.dataImg[i].title_img_data_tour;
                        photoList.push({
                            id_img: id_img, 
                            name_img: name_img,
                            alt_img: alt_img,
                            description_img: description_img,
                            title_img: title_img
                        });
                    }

                    photoListMP1.splice(0, photoListMP1.length);
                    for(let i = 0; i < r_getDataTour.dataImgMP1.length; i++) {
                        const id_img = r_getDataTour.dataImgMP1[i].id_img_data_tour_meeting_p_1;
                        const name_img = r_getDataTour.dataImgMP1[i].name_img_data_tour_meeting_p_1;
                        const alt_img = r_getDataTour.dataImgMP1[i].alt_img_data_tour_meeting_p_1;
                        const description_img = r_getDataTour.dataImgMP1[i].description_img_data_tour_meeting_p_1;
                        const title_img = r_getDataTour.dataImgMP1[i].title_img_data_tour_meeting_p_1;
                        photoListMP1.push({
                            id_img: id_img, 
                            name_img: name_img,
                            alt_img: alt_img,
                            description_img: description_img,
                            title_img: title_img
                        });
                    }

                    photoListMP2.splice(0, photoListMP2.length);
                    for(let i = 0; i < r_getDataTour.dataImgMP2.length; i++) {
                        const id_img = r_getDataTour.dataImgMP2[i].id_img_data_tour_meeting_p_2;
                        const name_img = r_getDataTour.dataImgMP2[i].name_img_data_tour_meeting_p_2;
                        const alt_img = r_getDataTour.dataImgMP2[i].alt_img_data_tour_meeting_p_2;
                        const description_img = r_getDataTour.dataImgMP2[i].description_img_data_tour_meeting_p_2;
                        const title_img = r_getDataTour.dataImgMP2[i].title_img_data_tour_meeting_p_2;
                        photoListMP2.push({
                            id_img: id_img, 
                            name_img: name_img,
                            alt_img: alt_img,
                            description_img: description_img,
                            title_img: title_img
                        });
                    }

                    setCheckProcess(false);
                }
                else if (r_getDataTour.status === 0) {
                    setCheckProcess(false);
                    swal.fire("", "Get data tour failed", "warning");
                }
                else {
                    setCheckProcess(false);
                    swal.fire("", "Please refresh page", "error");
                    localStorage.clear();
                    history.push('/auth/login');
                }
            }
        } catch (error) {
            setCheckProcess(false);
            swal.fire("", "Please refresh page", "error");
            console.log(error);
        }
    }

    const showPreview = (ele) => {
        var input = ele.target;
        setNewPreviewImg(input.files[0])
        var reader = new FileReader();
        if(typeof input.files[0] !== 'undefined'){
            reader.onload = function(){
                var dataURL = reader.result;
                var output = document.getElementById('img_preview');
                output.src = dataURL;
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    const showPhoto = (ele) => {
        var input = ele.target;
        setNewNamePhoto(input.files[0])
        var reader = new FileReader();
        if(typeof input.files[0] !== 'undefined'){
            reader.onload = function(){
                var dataURL = reader.result;
                var output = document.getElementById('img_photo');
                output.src = dataURL;
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    const getHighlight = (val) => {
        setHighlight(val);
    }

    const getContent = (val) => {
        setContent(val);
    }

    const getIncludes = (val) => {
        setIncludes(val);
    }

    const getExcludes = (val) => {
        setExcludes(val);
    }

    const getYouNeedToKnow = (val) => {
        setYouNeedToKnow(val);
    }

    const getHowtoTravel = (val) => {
        setHowToTravel(val);
    }

    const getCancellationPolicy = (val) => {
        setCancellationPolicy(val);
    }

    const submitTour = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        if (photo.length > 0) {
            for(let i = 0; i < photo.length; i++) {
                formData.append("photos", photo[i]);
            }
        }

        if (photoMP1.length > 0) {
            for(let i = 0; i < photoMP1.length; i++) {
                formData.append("photosMP1", photoMP1[i]);
            }
        }

        if (photoMP2.length > 0) {
            for(let i = 0; i < photoMP2.length; i++) {
                formData.append("photosMP2", photoMP2[i]);
            }
        }

        formData.append("idDataTour", idDataTour);
        formData.append("tourName", tourName);
        formData.append("address", address);
        formData.append("contact", contact);
        formData.append("type", type);
        formData.append("star", star);
        formData.append("email", email);
        formData.append("destinationMP1", destinationMP1);
        formData.append("detailMP1", detailMP1);
        formData.append("destinationMP2", destinationMP2);
        formData.append("detailMP2", detailMP2);
        formData.append("highlight", highlight);
        formData.append("content", content);
        formData.append("includes", includes);
        formData.append("excludes", excludes);
        formData.append("youNeedToKnow", youNeedToKnow);
        formData.append("howToTravel", howToTravel);
        formData.append("cancellationPolicy", cancellationPolicy);

        try {
            const res_updateTour = await fetch(`${API_URL}/api/backend/tour/updateTour`, {
                method: "PATCH",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData
            });
            if(res_updateTour.ok) {
                const r_updateTour = await res_updateTour.json();
                if (r_updateTour.status === 1) {
                    swal.fire("", "Update tour successfully", "success");
                    updateDataTour();
                }
                else if (r_updateTour.status === 2){
                    swal.fire("", "Update tour failed", "error");
                }
                else {
                    swal.fire("","Your status is wrong","error");
                    localStorage.clear();
                    history.push('/auth/login');
                }
            }
        } catch (error) {
            swal.fire("","Please try again","warning");
            localStorage.clear();
            history.push('/auth/login');
            console.log(error)
        }
    }

    const ShowModalPreview = () => {
        setShowModalPreview(true);
    }

    const HideModalPreview = () => {
        setShowModalPreview(false);
    }

    const submitEditPreview = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        if (previewImage === '') {
            console.log('have not')
            console.log(previewImage)
            formData.append("previewImage", previewImage);
            formData.append("checkImagePreview", false);
        }
        else {
            console.log('have')
            console.log(newPreviewImg)
            formData.append("previewImage", newPreviewImg);
            formData.append("checkImagePreview", true);
        }

        formData.append("id_data_tour", idDataTour);
        formData.append("altPreviewImg", altPreviewImg);
        formData.append("titlePreviewImg", titlePreviewImg);
        formData.append("desPreviewImg", desPreviewImg);

        try {
            const res_editPreview = await fetch(`${API_URL}/api/backend/tour/editPreview`, {
                method: "PATCH",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData
            });
            if (res_editPreview.ok) {
                const r_editPreview = await res_editPreview.json();
                if (r_editPreview.status === 1) {
                    updateDataTour();
                    swal.fire("","Update preview image successfully","success");
                }
                else if (r_editPreview.status === 0) {
                    swal.fire("","Update preview image failed","error");
                }
                else {
                    swal.fire("","Your status is wrong","error");
                    localStorage.clear();
                    history.push('/auth/login');
                }
            }
        } catch (error) {
            swal.fire("","Please try again","warning");
            localStorage.clear();
            history.push('/auth/login');
            console.log(error);
        }
    }

    const setShowPhoto = () => {
        document.getElementById("hide_photo_del").style.display = "block";
        document.getElementById("hide_photo").style.display = "block";
        document.getElementById("show_photo").style.display = "none";
        document.getElementById("photo_main").style.display = "block";
    }

    const hidePhoto = () => {
        document.getElementById("photo_main").style.display = "none";
        document.getElementById("show_photo").style.display = "block";
        document.getElementById("hide_photo").style.display = "none";
        document.getElementById("hide_photo_del").style.display = "none";
    }

    const editPhoto = (e) => {
        const id_img = e.target.value;
        const photo_name = document.getElementById(`photo_name_${id_img}`).value;
        const photo_alt = document.getElementById(`photo_alt_${id_img}`).value;
        const photo_title = document.getElementById(`photo_title_${id_img}`).value;
        const photo_description = document.getElementById(`photo_description_${id_img}`).value;

        setIdPhotoEdit(id_img);
        setShowModalPhoto(true);
        setNamePhoto(photo_name);
        setAltPhoto(photo_alt);
        setTitlePhoto(photo_title);
        setDescriptionPhoto(photo_description);
    }

    const hideModalPhoto = () => {
        setShowModalPhoto(false);
    }

    const submitPhoto = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("idPhotoEdit", idPhotoEdit);
        formData.append("altPhoto", altPhoto);
        formData.append("titlePhoto", titlePhoto);
        formData.append("descriptionPhoto", descriptionPhoto);

        if (newNamePhoto) {
            formData.append("photos", newNamePhoto);
        }

        try {
            const res_editPhoto = await fetch(`${API_URL}/api/backend/tour/editPhoto`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData
            });
            if (res_editPhoto.ok) {
                const r_editPhoto = await res_editPhoto.json();
                if (r_editPhoto.status === 1) {
                    updateDataTour();
                    swal.fire("", "Update photo successfully", "success");
                }
                else if (r_editPhoto.status === 2) {
                    swal.fire("", "Update photo failed", "error");
                }
                else {
                    swal.fire("","Your status is wrong","error");
                    localStorage.clear();
                    history.push('/auth/login');
                }
            }
        } catch (error) {
            swal.fire("","Please try again","warning");
            localStorage.clear();
            history.push('/auth/login');
            console.log(error);
        }
    }

    const deletePhoto = async (e) => {
        const idPhotoDel = e.target.value;
        const conFirmDel = await swal.fire({
            title: "",
            text: "Are you sure you want to delete this photo?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        });
        if(conFirmDel.isConfirmed) {
            try {
                const res_photoDel = await fetch(`${API_URL}/api/backend/tour/deletePhoto`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        idPhotoDel: idPhotoDel
                    })
                });
                if (res_photoDel.ok) {
                    const r_photoDel = await res_photoDel.json();
                    if (r_photoDel.status === 1) {
                        updateDataTour();
                        swal.fire("", "Delete photo successfully", "success");
                    }
                    else if (r_photoDel.status === 0) {
                        swal.fire("", "Delete photo failed", "error");
                    }
                    else {
                        swal.fire("","Your status is wrong","error");
                        localStorage.clear();
                        history.push('/auth/login');
                    }
                }
            } catch (error) {
                swal.fire("","Please try again","warning");
                localStorage.clear();
                history.push('/auth/login');
                console.log(error);
            }
        }
    }

    const deletePhotoAll = async (e) => {
        const conFirmDel = await swal.fire({
            title: "",
            text: "Are you sure you want to delete photo all?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        });
        if(conFirmDel.isConfirmed) {
            try {
                const res_deletePhoto = await fetch(`${API_URL}/api/backend/tour/deletePhotoAll`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        idDataTour: idDataTour
                    })
                })
                if (res_deletePhoto.ok) {
                    const r_deletePhoto = await res_deletePhoto.json();
                    if (r_deletePhoto.status === 1) {
                        updateDataTour();
                        swal.fire("", "Delete photo successfully", "success");
                    }
                    else if (r_deletePhoto.status === 0) {
                        swal.fire("", "Delete all photo failed", "error");
                    }
                    else {
                        swal.fire("","Your status is wrong","error");
                        localStorage.clear();
                        history.push('/auth/login');
                    }
                }
            } catch (error) {
                swal.fire("","Please try again","warning");
                localStorage.clear();
                history.push('/auth/login');
                console.log(error);
            }
        }
    }

    const setShowPhotoMP1 = () => {
        document.getElementById("hide_photo_delMP1").style.display = "block";
        document.getElementById("hide_photoMP1").style.display = "block";
        document.getElementById("show_photoMP1").style.display = "none";
        document.getElementById("photo_MP1").style.display = "block";
    }

    const hidePhotoMP1 = () => {
        document.getElementById("photo_MP1").style.display = "none";
        document.getElementById("show_photoMP1").style.display = "block";
        document.getElementById("hide_photoMP1").style.display = "none";
        document.getElementById("hide_photo_delMP1").style.display = "none";
    }

    const deletePhotoAllMP1 = async (e) => {
        const conFirmDel = await swal.fire({
            title: "",
            text: "Are you sure you want to delete photo all?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        });
        if(conFirmDel.isConfirmed) {
            try {
                const res_deletePhoto = await fetch(`${API_URL}/api/backend/tour/deletePhotoAllMP1`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        idDataTour: idDataTour
                    })
                })
                if (res_deletePhoto.ok) {
                    const r_deletePhoto = await res_deletePhoto.json();
                    if (r_deletePhoto.status === 1) {
                        updateDataTour();
                        swal.fire("", "Delete photo all meeting point 1 successfully", "success");
                    }
                    else if (r_deletePhoto.status === 0) {
                        swal.fire("", "Delete all photo meeting point 1 failed", "error");
                    }
                    else {
                        swal.fire("","Your status is wrong","error");
                        localStorage.clear();
                        history.push('/auth/login');
                    }
                }
            } catch (error) {
                swal.fire("","Please try again","warning");
                localStorage.clear();
                history.push('/auth/login');
                console.log(error);
            }
        }
    }

    const editPhotoMP1 = (e) => {
        const id_img = e.target.value;
        const photo_name = document.getElementById(`photo_name_MP1_${id_img}`).value;
        const photo_alt = document.getElementById(`photo_alt_MP1_${id_img}`).value;
        const photo_title = document.getElementById(`photo_title_MP1_${id_img}`).value;
        const photo_description = document.getElementById(`photo_description_MP1_${id_img}`).value;

        setIdPhotoEdit(id_img);
        setShowModalPhotoMP1(true);
        setNamePhoto(photo_name);
        setAltPhoto(photo_alt);
        setTitlePhoto(photo_title);
        setDescriptionPhoto(photo_description);
    }

    const deletePhotoMP1 = async (e) => {
        e.preventDefault();

        const idPhotoDel = e.target.value;
        const conFirmDel = await swal.fire({
            title: "",
            text: "Are you sure you want to delete this photo?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        });
        if(conFirmDel.isConfirmed) {
            try {
                const res_photoDel = await fetch(`${API_URL}/api/backend/tour/deletePhotoMP1`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        idPhotoDel: idPhotoDel
                    })
                });
                if (res_photoDel.ok) {
                    const r_photoDel = await res_photoDel.json();
                    if (r_photoDel.status === 1) {
                        updateDataTour();
                        swal.fire("", "Delete photo successfully", "success");
                    }
                    else if (r_photoDel.status === 0) {
                        swal.fire("", "Delete photo failed", "error");
                    }
                    else {
                        swal.fire("","Your status is wrong","error");
                        localStorage.clear();
                        history.push('/auth/login');
                    }
                }
            } catch (error) {
                swal.fire("","Please try again","warning");
                localStorage.clear();
                history.push('/auth/login');
                console.log(error);
            }
        }
    }

    const hideModalPhotoMP1 = () => {
        setShowModalPhotoMP1(false);
    }

    const submitPhotoMP1 = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("idPhotoEdit", idPhotoEdit);
        formData.append("altPhotoMP1", altPhoto);
        formData.append("titlePhotoMP1", titlePhoto);
        formData.append("descriptionPhotoMP1", descriptionPhoto);

        if (newNamePhoto) {
            formData.append("photosMP1", newNamePhoto);
        }

        try {
            const res_editPhotoMP1 = await fetch(`${API_URL}/api/backend/tour/editPhotoMP1`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData
            });
            if (res_editPhotoMP1.ok) {
                const r_editPhotoMP1 = await res_editPhotoMP1.json();
                if (r_editPhotoMP1.status === 1) {
                    updateDataTour();
                    swal.fire("", "Update photo successfully", "success");
                }
                else if (r_editPhotoMP1.status === 0) {
                    swal.fire("", "Update photo failed", "error");
                }
                else {
                    swal.fire("","Your status is wrong","error");
                    localStorage.clear();
                    history.push('/auth/login');
                }
            }
        } catch (error) {
            swal.fire("","Please try again","warning");
            localStorage.clear();
            history.push('/auth/login');
            console.log(error);
        }
    }

    const showPhotoMP1 = (ele) => {
        var input = ele.target;
        setNewNamePhoto(input.files[0])
        var reader = new FileReader();
        if(typeof input.files[0] !== 'undefined'){
            reader.onload = function(){
                var dataURL = reader.result;
                var output = document.getElementById('img_photoMP1');
                output.src = dataURL;
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    const setShowPhotoMP2 = () => {
        document.getElementById("hide_photo_delMP2").style.display = "block";
        document.getElementById("hide_photoMP2").style.display = "block";
        document.getElementById("show_photoMP2").style.display = "none";
        document.getElementById("photo_MP2").style.display = "block";
    }

    const hidePhotoMP2 = () => {
        document.getElementById("photo_MP2").style.display = "none";
        document.getElementById("show_photoMP2").style.display = "block";
        document.getElementById("hide_photoMP2").style.display = "none";
        document.getElementById("hide_photo_delMP2").style.display = "none";
    }

    const deletePhotoAllMP2 = async (e) => {
        const conFirmDel = await swal.fire({
            title: "",
            text: "Are you sure you want to delete photo all?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        });
        if(conFirmDel.isConfirmed) {
            try {
                const res_deletePhoto = await fetch(`${API_URL}/api/backend/tour/deletePhotoAllMP2`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        idDataTour: idDataTour
                    })
                })
                if (res_deletePhoto.ok) {
                    const r_deletePhoto = await res_deletePhoto.json();
                    if (r_deletePhoto.status === 1) {
                        updateDataTour();
                        swal.fire("", "Delete photo all meeting point 2 successfully", "success");
                    }
                    else if (r_deletePhoto.status === 0) {
                        swal.fire("", "Delete all photo meeting point 2 failed", "error");
                    }
                    else {
                        swal.fire("","Your status is wrong","error");
                        localStorage.clear();
                        history.push('/auth/login');
                    }
                }
            } catch (error) {
                swal.fire("","Please try again","warning");
                localStorage.clear();
                history.push('/auth/login');
                console.log(error);
            }
        }
    }

    const editPhotoMP2 = (e) => {
        const id_img = e.target.value;
        const photo_name = document.getElementById(`photo_name_MP2_${id_img}`).value;
        const photo_alt = document.getElementById(`photo_alt_MP2_${id_img}`).value;
        const photo_title = document.getElementById(`photo_title_MP2_${id_img}`).value;
        const photo_description = document.getElementById(`photo_description_MP2_${id_img}`).value;

        setIdPhotoEdit(id_img);
        setShowModalPhotoMP2(true);
        setNamePhoto(photo_name);
        setAltPhoto(photo_alt);
        setTitlePhoto(photo_title);
        setDescriptionPhoto(photo_description);
    }

    const deletePhotoMP2 = async (e) => {
        e.preventDefault();

        const idPhotoDel = e.target.value;
        const conFirmDel = await swal.fire({
            title: "",
            text: "Are you sure you want to delete this photo?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        });
        if(conFirmDel.isConfirmed) {
            try {
                const res_photoDel = await fetch(`${API_URL}/api/backend/tour/deletePhotoMP2`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        idPhotoDel: idPhotoDel
                    })
                });
                if (res_photoDel.ok) {
                    const r_photoDel = await res_photoDel.json();
                    if (r_photoDel.status === 1) {
                        updateDataTour();
                        swal.fire("", "Delete photo successfully", "success");
                    }
                    else if (r_photoDel.status === 0) {
                        swal.fire("", "Delete photo failed", "error");
                    }
                    else {
                        swal.fire("","Your status is wrong","error");
                        localStorage.clear();
                        history.push('/auth/login');
                    }
                }
            } catch (error) {
                swal.fire("","Please try again","warning");
                localStorage.clear();
                history.push('/auth/login');
                console.log(error);
            }
        }
    }

    const hideModalPhotoMP2 = () => {
        setShowModalPhotoMP2(false);
    }

    const submitPhotoMP2 = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("idPhotoEdit", idPhotoEdit);
        formData.append("altPhotoMP2", altPhoto);
        formData.append("titlePhotoMP2", titlePhoto);
        formData.append("descriptionPhotoMP2", descriptionPhoto);

        if (newNamePhoto) {
            formData.append("photosMP2", newNamePhoto);
        }

        try {
            const res_editPhotoMP2 = await fetch(`${API_URL}/api/backend/tour/editPhotoMP2`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData
            });
            if (res_editPhotoMP2.ok) {
                const r_editPhotoMP2 = await res_editPhotoMP2.json();
                if (r_editPhotoMP2.status === 1) {
                    updateDataTour();
                    swal.fire("", "Update photo successfully", "success");
                }
                else if (r_editPhotoMP2.status === 0) {
                    swal.fire("", "Update photo failed", "error");
                }
                else {
                    swal.fire("","Your status is wrong","error");
                    localStorage.clear();
                    history.push('/auth/login');
                }
            }
        } catch (error) {
            swal.fire("","Please try again","warning");
            localStorage.clear();
            history.push('/auth/login');
            console.log(error);
        }
    }

    const showPhotoMP2 = (ele) => {
        var input = ele.target;
        setNewNamePhoto(input.files[0])
        var reader = new FileReader();
        if(typeof input.files[0] !== 'undefined'){
            reader.onload = function(){
                var dataURL = reader.result;
                var output = document.getElementById('img_photoMP2');
                output.src = dataURL;
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    if(checkProcess) {
        return(
            <div style={{width: '100%'}}>
                <HeaderEmtry />
                <LinearProgress />
            </div>
        );
    }
    else {
        return (
            <>
                <HeaderEmtry />
                {/* Page content */}
                <Container className="mt--6" fluid>
                    <Row>
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="bg-transparent">
                                    <h3 className="mb-0">Edit Tour Details</h3>
                                </CardHeader>
                                <CardBody>
                                    <Form role="form" onSubmit={submitTour}>
                                        <Row style={{alignItems: 'center'}}>
                                            <Col lg="2" md="12">
                                                <p className="text-muted">Tour Name<span style={{color: 'red'}}> * </span>:</p>
                                            </Col>
                                            <Col lg="10" md="12">
                                                <FormGroup>
                                                    <InputGroup className="input-group-alternative mb-3">
                                                        <Input 
                                                            placeholder="Tour Name" 
                                                            type="text"
                                                            required
                                                            value={tourName}
                                                            onChange={(e) => setTourName(e.target.value)}
                                                        />
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row style={{alignItems: 'center'}}>
                                            <Col lg="2" md="12">
                                                <p className="text-muted">Address<span style={{color: 'red'}}> * </span>:</p>
                                            </Col>
                                            <Col lg="10" md="12">
                                                <FormGroup>
                                                    <InputGroup className="input-group-alternative mb-3">
                                                        <Input 
                                                            placeholder="Address" 
                                                            type="text"
                                                            required
                                                            value={address}
                                                            onChange={(e) => setAddress(e.target.value)}
                                                        />
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row style={{alignItems: 'center'}}>
                                            <Col lg="2" md="12">
                                                <p className="text-muted">Contact<span style={{color: 'red'}}> * </span>:</p>
                                            </Col>
                                            <Col lg="10" md="12">
                                                <FormGroup>
                                                    <InputGroup className="input-group-alternative mb-3">
                                                        <Input 
                                                            placeholder="Contact Number" 
                                                            type="text"
                                                            required
                                                            value={contact}
                                                            onChange={(e) => setContact(e.target.value)}
                                                        />
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row style={{alignItems: 'center'}}>
                                            <Col lg="2" md="12">
                                                <p className="text-muted">Type<span style={{color: 'red'}}> * </span>:</p>
                                            </Col>
                                            <Col lg="3" md="6" xs="6">
                                                <FormGroup>
                                                    <InputGroup className="input-group-alternative mb-3">
                                                        <select 
                                                            className="form-control" 
                                                            required
                                                            value={type}
                                                            onChange={(e) => (setType(e.target.value))}
                                                        >
                                                            <option value="">Day</option>
                                                            <option value="Half">Half</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                        </select>
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="2" md="6" xs="6">
                                                <p className="text-muted">Day Tour</p>
                                            </Col>
                                        </Row>
                                        <Row style={{alignItems: 'center'}}>
                                            <Col lg="2" md="12">
                                                <p className="text-muted">Star<span style={{color: 'red'}}> * </span>:</p>
                                            </Col>
                                            <Col lg="3" md="12">
                                                <FormGroup>
                                                    <InputGroup className="input-group-alternative mb-3">
                                                        <select 
                                                            className="form-control" 
                                                            required
                                                            value={star}
                                                            onChange={(e) => setStar(e.target.value)}
                                                        >
                                                            <option value="">Star</option>
                                                            <option value="1">1</option>
                                                            <option value="1.5">1.5</option>
                                                            <option value="2">2</option>
                                                            <option value="2.5">2.5</option>
                                                            <option value="3">3</option>
                                                            <option value="3.5">3.5</option>
                                                            <option value="4">4</option>
                                                            <option value="4.5">4.5</option>
                                                            <option value="5">5</option>
                                                        </select>
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row style={{alignItems: 'center'}}>
                                            <Col lg="2" md="12">
                                                <p className="text-muted">Email<span style={{color: 'red'}}> * </span>:</p>
                                            </Col>
                                            <Col lg="10" md="12">
                                                <FormGroup>
                                                    <InputGroup className="input-group-alternative mb-3">
                                                        <Input 
                                                            placeholder="Email" 
                                                            type="email"
                                                            required
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                        />
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row style={{alignItems: 'center'}}>
                                            <Col lg="2" md="12">
                                                <p className="text-muted">Preview Image<span style={{color: 'red'}}>* </span>:</p>
                                            </Col>
                                            <Col lg="6" md="12">
                                                <FormGroup>
                                                    <div>
                                                        <img 
                                                            src={`${API_URL}/filesTour/${previewImage}`}
                                                            style={{height: "150px", width: "150px"}}
                                                        />
                                                    </div>
                                                    <div className="mt-1">
                                                        <Button 
                                                            color="primary"
                                                            onClick={ShowModalPreview}
                                                        >
                                                            Edit
                                                        </Button>
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row style={{alignItems: 'center'}}>
                                            <Col lg="2" md="12">
                                                <p className="text-muted">Photos<span style={{color: 'red'}}>* </span>:</p>
                                            </Col>
                                            <Col lg="6" md="12">
                                                <FormGroup>
                                                    <InputGroup className="input-group-alternative mb-3">
                                                        <Input 
                                                            id="photo"
                                                            type="file"
                                                            accept="image/jpeg, image/png"
                                                            multiple
                                                            onChange={(e) =>{
                                                                if(e.target.files.length <= 20) {
                                                                    setPhoto(e.target.files);
                                                                }
                                                                else {
                                                                    document.getElementById('photo').value = '';
                                                                    swal.fire("", "Limit 20 photos", "warning");
                                                                }
                                                            }}
                                                        />
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="2" md="12"></Col>
                                            <Col lg="10" md="12">
                                                <div style={{display: 'flex'}}>
                                                    <Button
                                                        id="show_photo"
                                                        color="primary"
                                                        onClick={setShowPhoto}
                                                    >
                                                        Show Photos
                                                    </Button>
                                                    <Button
                                                        id="hide_photo"
                                                        style={{display: 'none'}}
                                                        color="primary"
                                                        onClick={hidePhoto}
                                                    >
                                                        Hide Photos
                                                    </Button>
                                                    <Button
                                                        id="hide_photo_del"
                                                        style={{display: 'none'}}
                                                        color="primary"
                                                        onClick={deletePhotoAll}
                                                    >
                                                        Delete All
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <div 
                                                id="photo_main"
                                                className="mt-3"
                                                style={{display: "none"}}
                                            >
                                                <Col lg="12" md="12" style={{display: "flex", flexWrap: "wrap"}}>
                                                    {
                                                        photoList.map((data, i) => {
                                                            return(
                                                                <div key={i} className="mt-3" style={{paddingRight: '15px'}}>
                                                                    <img 
                                                                        src={`${API_URL}/filesTour/${data.name_img}`}
                                                                        style={{height: "150px", width: "170px"}}
                                                                    />
                                                                    <Input 
                                                                        id={`photo_name_${data.id_img}`}
                                                                        type="hidden"
                                                                        value={data.name_img}
                                                                    />
                                                                    <Input 
                                                                        id={`photo_alt_${data.id_img}`}
                                                                        type="hidden"
                                                                        value={data.alt_img}
                                                                    />
                                                                    <Input 
                                                                        id={`photo_title_${data.id_img}`}
                                                                        type="hidden"
                                                                        value={data.title_img}
                                                                    />
                                                                    <Input 
                                                                        id={`photo_description_${data.id_img}`}
                                                                        type="hidden"
                                                                        value={data.description_img}
                                                                    />
                                                                    <div className="mt-2">
                                                                        <Button 
                                                                            color="primary"
                                                                            value={data.id_img}
                                                                            onClick={editPhoto}
                                                                        >
                                                                            Edit
                                                                        </Button>
                                                                        <Button 
                                                                            color="danger"
                                                                            value={data.id_img}
                                                                            onClick={deletePhoto}
                                                                        >
                                                                            Delete
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })
                                                    }
                                                </Col>
                                            </div>
                                        </Row>
                                        <hr />
                                        <Row>
                                            <Col>
                                                <p>Meeting Point 1</p>
                                            </Col>
                                        </Row>
                                        <Row style={{alignItems: 'center'}}>
                                            <Col lg="2" md="12">
                                                <p className="text-muted">Destination :</p>
                                            </Col>
                                            <Col lg="10" md="12">
                                                <FormGroup>
                                                    <InputGroup className="input-group-alternative mb-3">
                                                        <Input 
                                                            placeholder="Destination Meeting Point 1" 
                                                            type="text"
                                                            value={destinationMP1}
                                                            onChange={(e) => setDestinationMP1(e.target.value)}
                                                        />
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row style={{alignItems: 'center'}}>
                                            <Col lg="2" md="12">
                                                <p className="text-muted">Detail :</p>
                                            </Col>
                                            <Col lg="10" md="12">
                                                <FormGroup>
                                                    <InputGroup className="input-group-alternative mb-3">
                                                        <Input 
                                                            placeholder="Detail Meeting Point 1" 
                                                            type="text"
                                                            value={detailMP1}
                                                            onChange={(e) => setDetailMP1(e.target.value)}
                                                        />
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row style={{alignItems: 'center'}}>
                                            <Col lg="2" md="12">
                                                <p className="text-muted">Photos :</p>
                                            </Col>
                                            <Col lg="6" md="12">
                                                <FormGroup>
                                                    <InputGroup className="input-group-alternative mb-3">
                                                        <Input 
                                                            id="photoMP1"
                                                            type="file"
                                                            accept="image/jpeg, image/png"
                                                            multiple
                                                            onChange={(e) => {
                                                                if(e.target.files.length <= 20) {
                                                                    setPhotoMP1(e.target.files);
                                                                }
                                                                else {
                                                                    document.getElementById("photoMP1").value = '';
                                                                    swal.fire("", "Limit 20 photos", "warning");
                                                                }
                                                            }}
                                                        />
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="2" md="12"></Col>
                                            <Col lg="10" md="12">
                                                <div style={{display: 'flex'}}>
                                                    <Button
                                                        id="show_photoMP1"
                                                        color="primary"
                                                        onClick={setShowPhotoMP1}
                                                    >
                                                        Show Photos
                                                    </Button>
                                                    <Button
                                                        id="hide_photoMP1"
                                                        style={{display: 'none'}}
                                                        color="primary"
                                                        onClick={hidePhotoMP1}
                                                    >
                                                        Hide Photos
                                                    </Button>
                                                    <Button
                                                        id="hide_photo_delMP1"
                                                        style={{display: 'none'}}
                                                        color="primary"
                                                        onClick={deletePhotoAllMP1}
                                                    >
                                                        Delete All
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <div 
                                                id="photo_MP1"
                                                className="mt-3"
                                                style={{display: "none"}}
                                            >
                                                <Col lg="12" md="12" style={{display: "flex", flexWrap: "wrap"}}>
                                                    {
                                                        photoListMP1.map((data, i) => {
                                                            return(
                                                                <div key={i} className="mt-3" style={{paddingRight: '15px'}}>
                                                                    <img 
                                                                        src={`${API_URL}/filesTour/${data.name_img}`}
                                                                        style={{height: "150px", width: "170px"}}
                                                                    />
                                                                    <Input 
                                                                        id={`photo_name_MP1_${data.id_img}`}
                                                                        type="hidden"
                                                                        value={data.name_img}
                                                                    />
                                                                    <Input 
                                                                        id={`photo_alt_MP1_${data.id_img}`}
                                                                        type="hidden"
                                                                        value={data.alt_img}
                                                                    />
                                                                    <Input 
                                                                        id={`photo_title_MP1_${data.id_img}`}
                                                                        type="hidden"
                                                                        value={data.title_img}
                                                                    />
                                                                    <Input 
                                                                        id={`photo_description_MP1_${data.id_img}`}
                                                                        type="hidden"
                                                                        value={data.description_img}
                                                                    />
                                                                    <div className="mt-2">
                                                                        <Button 
                                                                            color="primary"
                                                                            value={data.id_img}
                                                                            onClick={editPhotoMP1}
                                                                        >
                                                                            Edit
                                                                        </Button>
                                                                        <Button 
                                                                            color="danger"
                                                                            value={data.id_img}
                                                                            onClick={deletePhotoMP1}
                                                                        >
                                                                            Delete
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })
                                                    }
                                                </Col>
                                            </div>
                                        </Row>
                                        <hr />
                                        <Row>
                                            <Col>
                                                <p>Meeting Point 2</p>
                                            </Col>
                                        </Row>
                                        <Row style={{alignItems: 'center'}}>
                                            <Col lg="2" md="12">
                                                <p className="text-muted">Destination :</p>
                                            </Col>
                                            <Col lg="10" md="12">
                                                <FormGroup>
                                                    <InputGroup className="input-group-alternative mb-3">
                                                        <Input 
                                                            placeholder="Destination Meeting Point 2" 
                                                            type="text"
                                                            value={destinationMP2}
                                                            onChange={(e) => setDestinationMP2(e.target.value)}
                                                        />
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row style={{alignItems: 'center'}}>
                                            <Col lg="2" md="12">
                                                <p className="text-muted">Detail :</p>
                                            </Col>
                                            <Col lg="10" md="12">
                                                <FormGroup>
                                                    <InputGroup className="input-group-alternative mb-3">
                                                        <Input 
                                                            placeholder="Detail Meeting Point 2" 
                                                            type="text"
                                                            value={detailMP2}
                                                            onChange={(e) => setDetailMP2(e.target.value)}
                                                        />
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row style={{alignItems: 'center'}}>
                                            <Col lg="2" md="12">
                                                <p className="text-muted">Photos :</p>
                                            </Col>
                                            <Col lg="6" md="12">
                                                <FormGroup>
                                                    <InputGroup className="input-group-alternative mb-3">
                                                        <Input 
                                                            id="photoMP2"
                                                            type="file"
                                                            accept="image/jpeg, image/png"
                                                            multiple
                                                            onChange={(e) => {
                                                                if(e.target.files.length <= 20) {
                                                                    setPhotoMP2(e.target.files);
                                                                }
                                                                else {
                                                                    document.getElementById("photoMP2").value = '';
                                                                    swal.fire("", "Limit 20 photos", "warning");
                                                                }
                                                            }}
                                                        />
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="2" md="12"></Col>
                                            <Col lg="10" md="12">
                                                <div style={{display: 'flex'}}>
                                                    <Button
                                                        id="show_photoMP2"
                                                        color="primary"
                                                        onClick={setShowPhotoMP2}
                                                    >
                                                        Show Photos
                                                    </Button>
                                                    <Button
                                                        id="hide_photoMP2"
                                                        style={{display: 'none'}}
                                                        color="primary"
                                                        onClick={hidePhotoMP2}
                                                    >
                                                        Hide Photos
                                                    </Button>
                                                    <Button
                                                        id="hide_photo_delMP2"
                                                        style={{display: 'none'}}
                                                        color="primary"
                                                        onClick={deletePhotoAllMP2}
                                                    >
                                                        Delete All
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <div 
                                                id="photo_MP2"
                                                className="mt-3"
                                                style={{display: "none"}}
                                            >
                                                <Col lg="12" md="12" style={{display: "flex", flexWrap: "wrap"}}>
                                                    {
                                                        photoListMP2.map((data, i) => {
                                                            return(
                                                                <div key={i} className="mt-3" style={{paddingRight: '15px'}}>
                                                                    <img 
                                                                        src={`${API_URL}/filesTour/${data.name_img}`}
                                                                        style={{height: "150px", width: "170px"}}
                                                                    />
                                                                    <Input 
                                                                        id={`photo_name_MP2_${data.id_img}`}
                                                                        type="hidden"
                                                                        value={data.name_img}
                                                                    />
                                                                    <Input 
                                                                        id={`photo_alt_MP2_${data.id_img}`}
                                                                        type="hidden"
                                                                        value={data.alt_img}
                                                                    />
                                                                    <Input 
                                                                        id={`photo_title_MP2_${data.id_img}`}
                                                                        type="hidden"
                                                                        value={data.title_img}
                                                                    />
                                                                    <Input 
                                                                        id={`photo_description_MP2_${data.id_img}`}
                                                                        type="hidden"
                                                                        value={data.description_img}
                                                                    />
                                                                    <div className="mt-2">
                                                                        <Button 
                                                                            color="primary"
                                                                            value={data.id_img}
                                                                            onClick={editPhotoMP2}
                                                                        >
                                                                            Edit
                                                                        </Button>
                                                                        <Button 
                                                                            color="danger"
                                                                            value={data.id_img}
                                                                            onClick={deletePhotoMP2}
                                                                        >
                                                                            Delete
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })
                                                    }
                                                </Col>
                                            </div>
                                        </Row>
                                        <hr />
                                        <Row style={{alignItems: 'center'}}>
                                            <Col lg="2" md="12">
                                                <p className="text-muted">Highlight :</p>
                                            </Col>
                                            <Col lg="10" md="12">
                                                <FormGroup>
                                                    <ReactQuill 
                                                        value={highlight}
                                                        onChange={getHighlight} 
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row style={{alignItems: 'center'}}>
                                            <Col lg="2" md="12">
                                                <p className="text-muted">Content :</p>
                                            </Col>
                                            <Col lg="10" md="12">
                                                <FormGroup>
                                                    <ReactQuill 
                                                        value={content}
                                                        onChange={getContent} 
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row style={{alignItems: 'center'}}>
                                            <Col lg="2" md="12">
                                                <p className="text-muted">Includes :</p>
                                            </Col>
                                            <Col lg="10" md="12">
                                                <FormGroup>
                                                    <ReactQuill 
                                                        value={includes}
                                                        onChange={getIncludes} 
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row style={{alignItems: 'center'}}>
                                            <Col lg="2" md="12">
                                                <p className="text-muted">Excludes :</p>
                                            </Col>
                                            <Col lg="10" md="12">
                                                <FormGroup>
                                                    <ReactQuill 
                                                        value={excludes}
                                                        onChange={getExcludes} 
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row style={{alignItems: 'center'}}>
                                            <Col lg="2" md="12">
                                                <p className="text-muted">You Need To Know :</p>
                                            </Col>
                                            <Col lg="10" md="12">
                                                <FormGroup>
                                                    <ReactQuill 
                                                        value={youNeedToKnow}
                                                        onChange={getYouNeedToKnow} 
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row style={{alignItems: 'center'}}>
                                            <Col lg="2" md="12">
                                                <p className="text-muted">How To Travel :</p>
                                            </Col>
                                            <Col lg="10" md="12">
                                                <FormGroup>
                                                    <ReactQuill 
                                                        value={howToTravel}
                                                        onChange={getHowtoTravel} 
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row style={{alignItems: 'center'}}>
                                            <Col lg="2" md="12">
                                                <p className="text-muted">Cancellation Policy :</p>
                                            </Col>
                                            <Col lg="10" md="12">
                                                <FormGroup>
                                                    <ReactQuill 
                                                        value={cancellationPolicy}
                                                        onChange={getCancellationPolicy} 
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="text-center">
                                                <Button className="mt-4" color="primary" type="submit">
                                                        Submit
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </CardBody>
                            </Card>
                        </div>
                    </Row>
                </Container>
                {/* Modal Preview Image */}
                <Modal isOpen={showModalPreview} toggle={HideModalPreview}>
                    <Form role="form" onSubmit={submitEditPreview}>
                        <ModalHeader 
                            toggle={HideModalPreview}>
                            Preview Image
                        </ModalHeader>
                        <ModalBody>
                                <Row>
                                    <Col lg="3" md="12">
                                        Photo:
                                    </Col>
                                    <Col lg="9" md="12">
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <Input 
                                                    type="file"
                                                    accept="image/jpeg, image/png"
                                                    onChange={(e) => setNewPreviewImg(e.target.files[0]), showPreview}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="3" md="12">
                                        Alt:
                                    </Col>
                                    <Col lg="9" md="12">
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative mb-3">
                                            <Input 
                                                type="text"
                                                value={altPreviewImg}
                                                onChange={(e) => setAltPreviewImg(e.target.value)}
                                            />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="3" md="12">
                                        Title:
                                    </Col>
                                    <Col lg="9" md="12">
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <Input 
                                                    type="text"
                                                    value={titlePreviewImg}
                                                    onChange={(e) => setTitlePreviewImg(e.target.value)}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="3" md="12">
                                        Description:
                                    </Col>
                                    <Col lg="9" md="12">
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <Input 
                                                    type="text"
                                                    value={desPreviewImg}
                                                    onChange={(e) => setDesPreviewImg(e.target.value)}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <img 
                                        id="img_preview"
                                        src={`${API_URL}/filesTour/${previewImage}`} 
                                        style={{width: '50%', height: '200px', marginLeft: 'auto', marginRight: 'auto'}}
                                    />
                                </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button 
                                type="submit"
                                color="primary" 
                                onClick={HideModalPreview}>
                                Submit
                            </Button>
                            <Button 
                                color="secondary" 
                                onClick={HideModalPreview}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Form>
                </Modal>

                {/* Modal Photo */}
                <Modal isOpen={showModalPhoto} toggle={hideModalPhoto}>
                    <Form role="form" onSubmit={submitPhoto}>
                        <ModalHeader 
                            toggle={hideModalPhoto}>
                            Photo
                        </ModalHeader>
                        <ModalBody>
                                <Row>
                                    <Col lg="3" md="12">
                                        Photo:
                                    </Col>
                                    <Col lg="9" md="12">
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <Input 
                                                    type="file"
                                                    accept="image/jpeg, image/png"
                                                    onChange={(e) => setNewNamePhoto(e.target.files[0]), showPhoto}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="3" md="12">
                                        Alt:
                                    </Col>
                                    <Col lg="9" md="12">
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative mb-3">
                                            <Input 
                                                type="text"
                                                value={altPhoto}
                                                onChange={(e) => setAltPhoto(e.target.value)}
                                            />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="3" md="12">
                                        Title:
                                    </Col>
                                    <Col lg="9" md="12">
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <Input 
                                                    type="text"
                                                    value={titlePhoto}
                                                    onChange={(e) => setTitlePhoto(e.target.value)}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="3" md="12">
                                        Description:
                                    </Col>
                                    <Col lg="9" md="12">
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <Input 
                                                    type="text"
                                                    value={descriptionPhoto}
                                                    onChange={(e) => setDescriptionPhoto(e.target.value)}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <img 
                                        id="img_photo"
                                        src={`${API_URL}/filesTour/${namePhoto}`} 
                                        style={{width: '50%', height: '200px', marginLeft: 'auto', marginRight: 'auto'}}
                                    />
                                </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button 
                                type="submit"
                                color="primary" 
                                onClick={hideModalPhoto}>
                                Submit
                            </Button>
                            <Button 
                                color="secondary" 
                                onClick={hideModalPhoto}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Form>
                </Modal>

                {/* Modal Photo MP1 */}
                <Modal isOpen={showModalPhotoMP1} toggle={hideModalPhotoMP1}>
                    <Form role="form" onSubmit={submitPhotoMP1}>
                        <ModalHeader 
                            toggle={hideModalPhotoMP1}>
                            Photo Meeting Point 1
                        </ModalHeader>
                        <ModalBody>
                                <Row>
                                    <Col lg="3" md="12">
                                        Photo:
                                    </Col>
                                    <Col lg="9" md="12">
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <Input 
                                                    type="file"
                                                    accept="image/jpeg, image/png"
                                                    onChange={(e) => setNewNamePhoto(e.target.files[0]), showPhotoMP1}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="3" md="12">
                                        Alt:
                                    </Col>
                                    <Col lg="9" md="12">
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative mb-3">
                                            <Input 
                                                type="text"
                                                value={altPhoto}
                                                onChange={(e) => setAltPhoto(e.target.value)}
                                            />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="3" md="12">
                                        Title:
                                    </Col>
                                    <Col lg="9" md="12">
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <Input 
                                                    type="text"
                                                    value={titlePhoto}
                                                    onChange={(e) => setTitlePhoto(e.target.value)}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="3" md="12">
                                        Description:
                                    </Col>
                                    <Col lg="9" md="12">
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <Input 
                                                    type="text"
                                                    value={descriptionPhoto}
                                                    onChange={(e) => setDescriptionPhoto(e.target.value)}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <img 
                                        id="img_photoMP1"
                                        src={`${API_URL}/filesTour/${namePhoto}`} 
                                        style={{width: '50%', height: '200px', marginLeft: 'auto', marginRight: 'auto'}}
                                    />
                                </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button 
                                type="submit"
                                color="primary" 
                                onClick={hideModalPhotoMP1}>
                                Submit
                            </Button>
                            <Button 
                                color="secondary" 
                                onClick={hideModalPhotoMP1}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Form>
                </Modal>

                {/* Modal Photo MP2 */}
                <Modal isOpen={showModalPhotoMP2} toggle={hideModalPhotoMP2}>
                    <Form role="form" onSubmit={submitPhotoMP2}>
                        <ModalHeader 
                            toggle={hideModalPhotoMP2}>
                            Photo Meeting Point 2
                        </ModalHeader>
                        <ModalBody>
                                <Row>
                                    <Col lg="3" md="12">
                                        Photo:
                                    </Col>
                                    <Col lg="9" md="12">
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <Input 
                                                    type="file"
                                                    accept="image/jpeg, image/png"
                                                    onChange={(e) => setNewNamePhoto(e.target.files[0]), showPhotoMP2}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="3" md="12">
                                        Alt:
                                    </Col>
                                    <Col lg="9" md="12">
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative mb-3">
                                            <Input 
                                                type="text"
                                                value={altPhoto}
                                                onChange={(e) => setAltPhoto(e.target.value)}
                                            />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="3" md="12">
                                        Title:
                                    </Col>
                                    <Col lg="9" md="12">
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <Input 
                                                    type="text"
                                                    value={titlePhoto}
                                                    onChange={(e) => setTitlePhoto(e.target.value)}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="3" md="12">
                                        Description:
                                    </Col>
                                    <Col lg="9" md="12">
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <Input 
                                                    type="text"
                                                    value={descriptionPhoto}
                                                    onChange={(e) => setDescriptionPhoto(e.target.value)}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <img 
                                        id="img_photoMP2"
                                        src={`${API_URL}/filesTour/${namePhoto}`} 
                                        style={{width: '50%', height: '200px', marginLeft: 'auto', marginRight: 'auto'}}
                                    />
                                </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button 
                                type="submit"
                                color="primary" 
                                onClick={hideModalPhotoMP2}>
                                Submit
                            </Button>
                            <Button 
                                color="secondary" 
                                onClick={hideModalPhotoMP2}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </>
        );
    }
  
};

export default EditTour;
