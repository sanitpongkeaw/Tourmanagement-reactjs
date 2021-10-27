import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { API_URL } from "API_URL";
//component
import HeaderEmtry from "components/Headers/HeaderEmtry";
// reactstrap components
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  FormGroup,
  Button,
  Input,
  Form,
  Col,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
} from "reactstrap";

import swal from 'sweetalert2';
import Select from 'react-select'
import LinearProgress from '@material-ui/core/LinearProgress';

const CalendarHalfAndOneAgent = () => {

    const [checkProcess, setCheckProcess] = useState(true);
    const [idDataTour, setIdDataTour] = useState('');
    const [tourNameList, setTourNameList] = useState([]);
    const [packageList, setPackageList] = useState([]);
    const [idPackage, setIdPackage] = useState('');
    const [packageName, setPackageName] = useState('');
    const [today, setToday] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [listDatePeriod, setListDatePeriod] = useState([]);
    const [listDateCompare, setListDateCompare] = useState([]);
    const [dataCalendar, setDataCalendar] = useState([]);
    const [checkGetCalendar, setCheckGetCalendar] = useState(false);
    const [checkModalTicket, setCheckModalTicket] = useState(false);
    const [stopSell, setStopSell] = useState('1');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [inventoryUpdate, setInventoryUpdate] = useState('');
    const [checkModalCutOffDay, setCheckModalCutOffDay] = useState(false);
    const [cutOffDay, setCutOffDay] = useState('');
    const [checkModalCutOffHours, setCheckModalCutOffHours] = useState(false);
    const [cutOffHours, setCutOffHours] = useState('');
    const [checkModalBookingBefore, setCheckModalBookingBefore] = useState(false);
    const [bookingBefore, setBookingBefore] = useState('');
    const [checkModalPromotionCode, setCheckPromotionCode] = useState(false);
    const [promotionCode, setPromotionCode] = useState('');
    const [checkModalPriceAdult, setCheckModalPriceAdult] = useState(false);
    const [priceAdult, setPriceAdult] = useState('');
    const [checkModalPriceChild, setCheckModalPriceChild] = useState(false);
    const [priceChild, setPriceChild] = useState('');

    const history = useHistory();

    useEffect(() => {
        if((Boolean(localStorage.getItem('status')) && Boolean(localStorage.getItem('token'))) && (localStorage.getItem('status') !== '' && localStorage.getItem('token') !== '')) {
          getToursName();
          const date = new Date();
          const year = date.getFullYear();
          const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : (date.getMonth() + 1);
          const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
          setToday(`${year}-${month}-${day}`);
          setStartDate(`${year}-${month}-${day}`);
        }
        else {
          history.push('/auth/login');
        }
    }, [])

    const styleP = {
        fontSize: '17px', 
        fontWeight: 'normal',
        lineHeight: '4px'
    }

    const styleThead =  {
        fontWeight: 'bold', 
        backgroundColor: '#5E72E4', 
        color: '#FFFFFF', 
        minWidth: '250px',
        height: '100px'
    }

    const styleTd = { 
        fontWeight: 'bold',
        padding: '10px' ,
        minWidth: '250px'
    }

    const styleTdStopSell = {
        backgroundColor: '#f2584e'
    }

    const styleTdHaveData = {
        backgroundColor: '#3391f5'
    }

    const styleWarning = {
        fontWeight: 'bold',
        color: 'red',
        justifyContent: 'center',
        textAlign: 'center'
    }

    const getToursName = async () => {
        setCheckProcess(true);
        try {
            const res_getToursName = await fetch(`${API_URL}/api/backend/calendar/getTourList`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res_getToursName.ok) {
                const r_getToursName = await res_getToursName.json();
                if (r_getToursName.status === 1) {
                    tourNameList.splice(0, tourNameList.length);
                    for (const data of r_getToursName.tour) {
                        tourNameList.push({
                            value: data.id_data_tour, 
                            label: data.tour_name,
                            type: data.type
                        });
                    }
                    setCheckProcess(false);
                }
                else if (r_getToursName.status === 0) {
                    setCheckProcess(false);
                    swal.fire("", "Get tour list failed", "warning");
                }
                else {
                    setCheckProcess(false);
                    swal.fire("", "Please refresh page", "error");
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

    const getValueTourList = async (data) => {
        setIdDataTour(data.value);
        const id_data_tour = data.value;

        try {
            const res_getPackage = await fetch(`${API_URL}/api/backend/package/getPackageList/${id_data_tour}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res_getPackage.ok) {
                const r_getPackage = await res_getPackage.json();
                if (r_getPackage.status === 1) {
                    packageList.splice(0, packageList.length);
                    for (const data of r_getPackage.package) {
                        packageList.push({
                            value: data.id_package_tour, 
                            label: data.package_name
                        });
                    }
                }
                else if (r_getPackage.status === 0) {
                    swal.fire("", "Get package list failed", "warning");
                }
                else {
                    swal.fire("", "Please refresh page", "error");
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
    };

    const getPackage = (data) => {
        setIdPackage(data.value);
        setPackageName(data.label);
    }

    const getDates = (startDate, endDate) => {
        let dates = [],
            currentDate = startDate,
            addDays = function(days) {
                let date = new Date(this.valueOf());
                date.setDate(date.getDate() + days);
                return date;
            };
        while (currentDate <= endDate) {
            dates.push(currentDate);
            currentDate = addDays.call(currentDate, 1);
        }
        return dates;
    };

    const submitCalendar = (e) => {
        e.preventDefault();

        if (idDataTour === '') {
            swal.fire("", "Please select Tour", "warning");
        }
        else if (idPackage === '') {
            swal.fire("", "Please select Package", "warning");
        }
        else {
            let arr_date_split = [];
            let split_start_date = startDate.split("-");
            let split_to_date = endDate.split("-");
            let dates = getDates(new Date(split_start_date[0],(split_start_date[1] - 1),split_start_date[2]), new Date(split_to_date[0],(split_to_date[1] - 1),split_to_date[2]));
            listDateCompare.splice(0, listDateCompare.length);
            dates.map((date) => {
                let date_split_for_compare = date.toString().substring(0, 16) + "24:00:00 GMT+0700 (Indochina Time)";
                let format_date_for_compare = new Date(date_split_for_compare).toISOString();
                let date_for_compare = format_date_for_compare.split("T", 1);
                listDateCompare.push(date_for_compare[0]);
    
                let date_split = date.toString().split(" ", 4);
                arr_date_split.push(`${date_split[0]} ${date_split[2]} ${date_split[1]} ${date_split[3]}`);
            });
            setListDatePeriod(arr_date_split);

            updateCalendar();
        }
    }

    const updateCalendar = async () => {
        setCheckProcess(true);
        try {
            const res_getCaladar = await fetch(`${API_URL}/api/backend/calendar/getCalendar/${startDate}/${endDate}/${idPackage}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res_getCaladar.ok) {
                const r_getCalendar = await res_getCaladar.json();
                if (r_getCalendar.status === 1) {

                    let count = 0;
                    dataCalendar.splice(0, dataCalendar.length);

                    for(let i = 0; i < listDateCompare.length; i++) {
                        if (count < r_getCalendar.data.length) {
                            if (r_getCalendar.data[count].date_ticket === listDateCompare[i]) {
                                dataCalendar.push({
                                    booking_before: r_getCalendar.data[count].booking_before,
                                    cut_off_day: r_getCalendar.data[count].cut_off_day,
                                    cut_off_hours: r_getCalendar.data[count].cut_off_hours,
                                    date_ticket: r_getCalendar.data[count].date_ticket,
                                    id_stop_sell: r_getCalendar.data[count].id_stop_sell,
                                    inventory: r_getCalendar.data[count].inventory,
                                    price_adult: r_getCalendar.data[count].price_adult,
                                    price_child: r_getCalendar.data[count].price_child,
                                    promotion_code: r_getCalendar.data[count].promotion_code,
                                });
                                count++;
                            }
                            else {
                                dataCalendar.push({
                                    booking_before: "NULL",
                                    cut_off_day: "NULL",
                                    cut_off_hours: "NULL",
                                    date_ticket: "NULL",
                                    id_stop_sell: 1,
                                    inventory: "NULL",
                                    price_adult: "NULL",
                                    price_child: "NULL",
                                    promotion_code: "NULL",
                                });
                            }
                        }
                        else {
                            dataCalendar.push({
                                booking_before: "NULL",
                                cut_off_day: "NULL",
                                cut_off_hours: "NULL",
                                date_ticket: "NULL",
                                id_stop_sell: 1,
                                inventory: "NULL",
                                price_adult: "NULL",
                                price_child: "NULL",
                                promotion_code: "NULL",
                            });
                        }
                    }
                    setCheckGetCalendar(true);
                    setCheckProcess(false);
                }
                else if (r_getCalendar.status === 0) {
                    setCheckProcess(false);
                    swal.fire("", "Get data failed", "warning");
                }
                else {
                    setCheckProcess(false);
                    swal.fire("", "Please refresh page", "error");
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

    const calendar = () => {
        if (listDatePeriod.length > 0 && idDataTour !== "" && idPackage !== "") {
            return(
                <>
                    <div style={{ position:'relative', overflow:'auto' }}>
                        <table width="" border="1" style={{ textAlign: 'center' }}>
                            <thead>
                                <tr>
                                    <td colSpan='2' style={styleThead}>{packageName}</td>
                                    {listDatePeriod.map((value, index) => { 
                                        return <td style={{ fontWeight: 'bold', backgroundColor: '#BDC3C7' }} key={index}>{value}</td>
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan='2' style={styleTd}>No. of Ticket <Button className="float-right" color="info" onClick={() => setCheckModalTicket(true)}>Edit</Button></td>
                                    {dataCalendar.map((value, index) => {
                                        return (
                                            <td key={index} style={
                                                value.id_stop_sell === 2 ? styleTdStopSell 
                                                : value.inventory === 0 ? styleTdHaveData
                                                : value.inventory !== 'NULL' ? null
                                                : styleTdHaveData
                                            }>{value.inventory === 0 ? 'NULL' : value.inventory}
                                            </td>
                                        )
                                    })}
                                </tr>
                                <tr>
                                    <td rowSpan='2' style={{ fontWeight: 'bold', minWidth: '100px' }}>Cut Off</td>
                                    <td style={styleTd}>Day <Button className="float-right" color="info" onClick={() => setCheckModalCutOffDay(true)}>Set Cut Off</Button></td>
                                    {dataCalendar.map((value, index) => {
                                        return (
                                            <td key={index} style={
                                                value.id_stop_sell === 2 ? styleTdStopSell 
                                                : value.cut_off_day === 0 ? styleTdHaveData
                                                : value.cut_off_day !== 'NULL' ? null
                                                : styleTdHaveData
                                            }>{value.cut_off_day === 0 ? 'NULL' : value.cut_off_day}
                                            </td>
                                        )
                                    })}
                                </tr>
                                <tr>
                                    <td style={styleTd}>Hours <Button className="float-right" color="info" onClick={() => setCheckModalCutOffHours(true)}>Set Cut Off</Button></td>
                                    {dataCalendar.map((value, index) => {
                                        return (
                                            <td key={index} style={
                                                value.id_stop_sell === 2 ? styleTdStopSell 
                                                : value.cut_off_hours === 0 ? styleTdHaveData
                                                : value.cut_off_hours !== 'NULL' ? null
                                                : styleTdHaveData
                                            }>{value.cut_off_hours === 0 ? 'NULL' : value.cut_off_hours}
                                            </td>
                                        )
                                    })}
                                </tr>
                                <tr>
                                    <td colSpan='2' style={styleTd}>Booking Before <Button className="float-right" color="info" onClick={() => setCheckModalBookingBefore(true)}>Edit</Button></td>
                                    {dataCalendar.map((value, index) => {
                                        return (
                                            <td key={index} style={
                                                value.id_stop_sell === 2 ? styleTdStopSell 
                                                : value.booking_before === 0 ? styleTdHaveData
                                                : value.booking_before !== 'NULL' ? null
                                                : styleTdHaveData
                                            }>{value.booking_before === 0 ? 'NULL' : value.booking_before}
                                            </td>
                                        )
                                    })}
                                </tr>
                                <tr>
                                    <td colSpan='2' style={styleTd}>Promotion Code <Button className="float-right" color="info" onClick={() => setCheckPromotionCode(true)}>Edit</Button></td>
                                    {dataCalendar.map((value, index) => {
                                        return (
                                            <td key={index} style={
                                                value.id_stop_sell === 2 ? styleTdStopSell 
                                                : value.promotion_code === '' ? styleTdHaveData
                                                : value.promotion_code !== 'NULL' ? null
                                                : styleTdHaveData
                                            }>{value.promotion_code === '' ? 'NULL' : value.promotion_code}
                                            </td>
                                        )
                                    })}
                                </tr>
                                <tr>
                                    <td colSpan='2' style={styleTd}>Adult <Button className="float-right" color="info" onClick={() => setCheckModalPriceAdult(true)}>Set Price</Button></td>
                                    {dataCalendar.map((value, index) => {
                                        return (
                                            <td key={index} style={
                                                value.id_stop_sell === 2 ? styleTdStopSell 
                                                : value.price_adult === 0 ? styleTdHaveData
                                                : value.price_adult !== 'NULL' ? null
                                                : styleTdHaveData
                                            }>{value.price_adult === 0 ? 'NULL' : value.price_adult}
                                            </td>
                                        )
                                    })}
                                </tr>
                                <tr>
                                    <td colSpan='2' style={styleTd}>Child <Button className="float-right" color="info" onClick={() => setCheckModalPriceChild(true)}>Set Price</Button></td>
                                    {dataCalendar.map((value, index) => {
                                        return (
                                            <td key={index} style={
                                                value.id_stop_sell === 2 ? styleTdStopSell 
                                                : value.price_child === 0 ? styleTdHaveData
                                                : value.price_child !== 'NULL' ? null
                                                : styleTdHaveData
                                            }>{value.price_child === 0 ? 'NULL' : value.price_child}
                                            </td>
                                        )
                                    })}
                                </tr>
                            </tbody>
                            <tfoot></tfoot>
                        </table>
                    </div>
                </>
            )
        }
    }

    /* ----------------------------- Modal No. Ticket ----------------------------- */

    const hideModalTicket = () => {
        setCheckModalTicket(false);
    }

    const submitInventory = async (e) => {
        setCheckProcess(true);
        e.preventDefault();

        try {
            const res_inventory = await fetch(`${API_URL}/api/backend/calendar/inventory`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    idPackage: idPackage,
                    fromDate: fromDate,
                    toDate: toDate,
                    inventory: inventoryUpdate, 
                    stopSell: stopSell
                })
            });
            if (res_inventory.ok) {
                const r_inventory = await res_inventory.json();
                if (r_inventory.status === 1) {
                    setInventoryUpdate('');
                    setStopSell('1');
                    updateCalendar();
                    swal.fire("", "Update inventory successfully", "success");
                }
                else if (r_inventory.status === 0) {
                    setCheckProcess(false);
                    swal.fire("", "Update inventory failed", "warning");
                }
                else {
                    setCheckProcess(false);
                    swal.fire("", "Please refresh page", "error");
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

    /* --------------------------- End Modal No. Ticket --------------------------- */

    /* ----------------------------- Modal Cut of day ----------------------------- */

    const hideModalCutOffDay = () => {
        setCheckModalCutOffDay(false);
    }

    const submitCutOffDay = async (e) => { //เขียน api
        setCheckProcess(true);
        e.preventDefault();

        try {
            const res_cutOffDay = await fetch(`${API_URL}/api/backend/calendar/cutOffDay`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    idPackage: idPackage,
                    fromDate: fromDate,
                    toDate: toDate,
                    cutOffDay: cutOffDay
                })
            });
            if (res_cutOffDay.ok) {
                console.log(res_cutOffDay)
                const r_cutOffDay = await res_cutOffDay.json();
                if (r_cutOffDay.status === 1) {
                    updateCalendar();
                    swal.fire("", "Update cut off day successfully", "success");
                }
                else if (r_cutOffDay.status === 0) {
                    setCheckProcess(false);
                    swal.fire("", "Update cut off day failed", "warning");
                }
                else {
                    setCheckProcess(false);
                    swal.fire("", "Please refresh page", "error");
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

    /* --------------------------- End Modal Cut of day --------------------------- */

    /* ---------------------------- Modal Cut of hours ---------------------------- */

    const hideModalCutOffHours = () => {
        setCheckModalCutOffHours(false);
    }

    const submitCutOffHours = async (e) => {
        setCheckProcess(true);
        e.preventDefault();

        try {
            const res_cutOffHours = await fetch(`${API_URL}/api/backend/calendar/cutOffHours`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    idPackage: idPackage,
                    fromDate: fromDate,
                    toDate: toDate,
                    cutOffHours: cutOffHours
                })
            });
            if (res_cutOffHours.ok) {
                const r_cutOffHours = await res_cutOffHours.json();
                if (r_cutOffHours.status === 1) {
                    updateCalendar();
                    swal.fire("", "Update cut off hours successfully", "success");
                }
                else if (r_cutOffHours.status === 0) {
                    setCheckProcess(false);
                    swal.fire("", "Update cut off hours failed", "warning");
                }
                else {
                    setCheckProcess(false);
                    swal.fire("", "Please refresh page", "error");
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

    /* -------------------------- End Modal Cut of hours -------------------------- */

    /* ------------------------------ Booking before ------------------------------ */

    const hideModalBookingBefore = () => {
        setCheckModalBookingBefore(false);
    }

    const submitBookingBefore = async (e) => {
        setCheckProcess(true);
        e.preventDefault();

        try {
            const res_updateBookingBefore = await fetch(`${API_URL}/api/backend/calendar/bookingBefore`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    idPackage: idPackage,
                    fromDate: fromDate,
                    toDate: toDate,
                    bookingBefore: bookingBefore
                })
            });
            if (res_updateBookingBefore.ok) {
                const r_updateBookingBefore = await res_updateBookingBefore.json();
                if (r_updateBookingBefore.status === 1) {
                    updateCalendar();
                    swal.fire("", "Update booking before successfully", "success");
                }
                else if (r_updateBookingBefore.status === 0) {
                    setCheckProcess(false);
                    swal.fire("", "Update booking before failed", "warning");
                }
                else {
                    setCheckProcess(false);
                    swal.fire("", "Please refresh page", "error");
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

    /* ---------------------------- End booking before ---------------------------- */

    /* ------------------------------ Promotion Code ------------------------------ */

    const hideModalPromotionCode = () => {
        setCheckPromotionCode(false);
    }

    const submitPromotionCode = async (e) => {
        console.log(promotionCode)
        setCheckProcess(true);
        e.preventDefault();

        try {
            const res_updatePromotionCode = await fetch(`${API_URL}/api/backend/calendar/promotionCode`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    idPackage: idPackage,
                    fromDate: fromDate,
                    toDate: toDate,
                    promotionCode: promotionCode
                })
            });
            if (res_updatePromotionCode.ok) {
                const r_updatePromotionCode = await res_updatePromotionCode.json();
                if (r_updatePromotionCode.status === 1) {
                    updateCalendar();
                    swal.fire("", "Update promotion code successfully", "success");
                }
                else if (r_updatePromotionCode.status === 0) {
                    setCheckProcess(false);
                    swal.fire("", "Update promotion code failed", "warning");
                }
                else {
                    setCheckProcess(false);
                    swal.fire("", "Please refresh page", "error");
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

    /* ---------------------------- End promotion code ---------------------------- */

    /* -------------------------------- Price Adult ------------------------------- */

    const hideModalPriceAdult = () => {
        setCheckModalPriceAdult(false);
    }

    const submitPriceAdult = async (e) => {
        setCheckProcess(true);
        e.preventDefault();

        try {
            const res_updatePriceAdult = await fetch(`${API_URL}/api/backend/calendar/priceAdult`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    idPackage: idPackage,
                    fromDate: fromDate,
                    toDate: toDate,
                    priceAdult: priceAdult
                })
            });
            if (res_updatePriceAdult.ok) {
                const r_updatePriceAdult = await res_updatePriceAdult.json();
                if (r_updatePriceAdult.status === 1) {
                    updateCalendar();
                    swal.fire("", "Update price adult successfully", "success");
                }
                else if (r_updatePriceAdult.status === 0) {
                    setCheckProcess(false);
                    swal.fire("", "Update price adult failed", "warning");
                }
                else {
                    setCheckProcess(false);
                    swal.fire("", "Please refresh page", "error");
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

    /* ------------------------------ End price adult ----------------------------- */

    /* -------------------------------- Price child ------------------------------- */

    const hideModalPriceChild = () => {
        setCheckModalPriceChild(false);
    }

    const submitPriceChild = async (e) => {
        setCheckProcess(true);
        e.preventDefault();

        try {
            const res_updatePriceChild = await fetch(`${API_URL}/api/backend/calendar/priceChild`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    idPackage: idPackage,
                    fromDate: fromDate,
                    toDate: toDate,
                    priceChild: priceChild
                })
            });
            if (res_updatePriceChild.ok) {
                const r_updatePriceChild = await res_updatePriceChild.json();
                if (r_updatePriceChild.status === 1) {
                    updateCalendar();
                    swal.fire("", "Update price child successfully", "success");
                }
                else if (r_updatePriceChild.status === 0) {
                    setCheckProcess(false);
                    swal.fire("", "Update price child failed", "warning");
                }
                else {
                    setCheckProcess(false);
                    swal.fire("", "Please refresh page", "error");
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

    /* ------------------------------ End price child ----------------------------- */

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
                                    <h3 className="mb-0">Calendar</h3>
                                </CardHeader>
                                <CardBody>
                                    <Form role="form" onSubmit={submitCalendar}>
                                        <Row style={{justifyContent: 'center'}} className="mb-4">
                                            <Col lg="4" md="9">
                                                <p style={styleP}>Tour</p>
                                                <Select 
                                                    placeholder="Select Tour" 
                                                    required
                                                    options={tourNameList} 
                                                    onChange={getValueTourList}
                                                />
                                            </Col>
                                        </Row>
                                        <Row style={{justifyContent: 'center'}} className="mb-4">
                                            <Col lg="4" md="9">
                                                <p style={styleP}>Package</p>
                                                <Select 
                                                    placeholder="Select Package" 
                                                    options={packageList} 
                                                    onChange={getPackage}
                                                />
                                            </Col>
                                        </Row>
                                        <Row style={{justifyContent: 'center'}} className="mb-4">
                                            <Col lg="4" md="9">
                                                <p style={styleP}>Date Start</p>
                                                <Input 
                                                    type="date"
                                                    required
                                                    value={startDate}
                                                    onChange={(e) => setStartDate(e.target.value)}
                                                />
                                            </Col>
                                        </Row>
                                        <Row style={{justifyContent: 'center'}} className="mb-4">
                                            <Col lg="4" md="9">
                                                <p style={styleP}>Date End</p>
                                                <Input 
                                                    type="date"
                                                    required
                                                    value={endDate}
                                                    onChange={(e) => setEndDate(e.target.value)}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="text-center">
                                                <Button className="mt-4 mb-4" color="primary" type="submit">
                                                    Submit
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                    {checkGetCalendar? calendar() : null}
                                </CardBody>
                            </Card>
                        </div>
                    </Row>
                </Container>

                {/* Modal inventory */}
                <Modal isOpen={checkModalTicket} toggle={hideModalTicket}>
                    <Form role="form" onSubmit={submitInventory}>
                        <ModalHeader 
                            toggle={hideModalTicket}>
                            Inventory update and Stop sell
                        </ModalHeader>
                        <ModalBody>
                            <Row>
                                <Col lg="4" md="12">
                                    From date*
                                </Col>
                                <Col lg="8" md="12">
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative mb-3">
                                            <Input 
                                                type="date"
                                                required
                                                onChange={(e) => setFromDate(e.target.value)}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="4" md="12">
                                    To date*
                                </Col>
                                <Col lg="8" md="12">
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative mb-3">
                                        <Input 
                                            type="date"
                                            required
                                            onChange={(e) => setToDate(e.target.value)}
                                        />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="4" md="12">
                                Inventory update
                                </Col>
                                <Col lg="8" md="12">
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative mb-3">
                                            <Input 
                                                type="number"
                                                min="0"
                                                onChange={(e) => setInventoryUpdate(e.target.value)}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="4" md="12">
                                    Stop sell*
                                </Col>
                                <Col lg="8" md="12">
                                    <div onChange={(e) => setStopSell(e.target.value)}>
                                        <div className="form-check form-check-inline">
                                            <Input className="form-check-input" type="radio" name="stop_sell" value="2"/>
                                            <label className="form-check-label">
                                                Yes
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <Input className="form-check-input" type="radio" name="stop_sell" value="1" defaultChecked={"checked"} />
                                            <label className="form-check-label">
                                                No
                                            </label>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button 
                                type="submit"
                                color="primary" 
                                onClick={hideModalTicket}>
                                Submit
                            </Button>
                            <Button 
                                color="secondary" 
                                onClick={hideModalTicket}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Form>
                </Modal>

                {/* Modal Cut of day */}
                <Modal isOpen={checkModalCutOffDay} toggle={hideModalCutOffDay}>
                    <Form role="form" onSubmit={submitCutOffDay}>
                        <ModalHeader 
                            toggle={hideModalCutOffDay}>
                            Select cut off day
                        </ModalHeader>
                        <ModalBody>
                            <Row>
                                <Col lg="4" md="12">
                                    From date*
                                </Col>
                                <Col lg="8" md="12">
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative mb-3">
                                            <Input 
                                                type="date"
                                                required
                                                onChange={(e) => setFromDate(e.target.value)}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="4" md="12">
                                    To date*
                                </Col>
                                <Col lg="8" md="12">
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative mb-3">
                                        <Input 
                                            type="date"
                                            required
                                            onChange={(e) => setToDate(e.target.value)}
                                        />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="4" md="12">
                                    Cut off *
                                </Col>
                                <Col lg="5" md="8" sm="8">
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative mb-3">
                                            <Input 
                                                type="number"
                                                required
                                                min="1"
                                                onChange={(e) => setCutOffDay(e.target.value)}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                                <Col lg="3" md="4" sm="4">
                                    Day(s)
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    <p style={styleWarning}>* You need insert inventory before set Cut Off Day.</p>
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button 
                                type="submit"
                                color="primary" 
                                onClick={hideModalCutOffDay}>
                                Submit
                            </Button>
                            <Button 
                                color="secondary" 
                                onClick={hideModalCutOffDay}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Form>
                </Modal>

                {/* Modal Cut of hours */}
                <Modal isOpen={checkModalCutOffHours} toggle={hideModalCutOffHours}>
                    <Form role="form" onSubmit={submitCutOffHours}>
                        <ModalHeader 
                            toggle={hideModalCutOffHours}>
                            Select cut off hours
                        </ModalHeader>
                        <ModalBody>
                            <Row>
                                <Col lg="4" md="12">
                                    From date*
                                </Col>
                                <Col lg="8" md="12">
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative mb-3">
                                            <Input 
                                                type="date"
                                                required
                                                onChange={(e) => setFromDate(e.target.value)}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="4" md="12">
                                    To date*
                                </Col>
                                <Col lg="8" md="12">
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative mb-3">
                                        <Input 
                                            type="date"
                                            required
                                            onChange={(e) => setToDate(e.target.value)}
                                        />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="4" md="12">
                                    Cut off *
                                </Col>
                                <Col lg="5" md="8" sm="8">
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative mb-3">
                                            <Input 
                                                type="number"
                                                required
                                                min="1"
                                                max="24"
                                                onChange={(e) => setCutOffHours(e.target.value)}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                                <Col lg="3" md="4" sm="4">
                                    Hour(s)
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    <p style={styleWarning}>* You need insert inventory before set Cut Off Hours.</p>
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button 
                                type="submit"
                                color="primary" 
                                onClick={hideModalCutOffHours}>
                                Submit
                            </Button>
                            <Button 
                                color="secondary" 
                                onClick={hideModalCutOffHours}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Form>
                </Modal>

                {/* Modal Booking before */}
                <Modal isOpen={checkModalBookingBefore} toggle={hideModalBookingBefore}>
                    <Form role="form" onSubmit={submitBookingBefore}>
                        <ModalHeader 
                            toggle={hideModalBookingBefore}>
                            Select booking before
                        </ModalHeader>
                        <ModalBody>
                            <Row>
                                <Col lg="4" md="12">
                                    From date*
                                </Col>
                                <Col lg="8" md="12">
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative mb-3">
                                            <Input 
                                                type="date"
                                                required
                                                onChange={(e) => setFromDate(e.target.value)}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="4" md="12">
                                    To date*
                                </Col>
                                <Col lg="8" md="12">
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative mb-3">
                                        <Input 
                                            type="date"
                                            required
                                            onChange={(e) => setToDate(e.target.value)}
                                        />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="4" md="12">
                                    Booking before *
                                </Col>
                                <Col lg="5" md="8" sm="8">
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative mb-3">
                                            <Input 
                                                type="number"
                                                required
                                                min="1"
                                                onChange={(e) => setBookingBefore(e.target.value)}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                                <Col lg="3" md="4" sm="4">
                                    Day(s)
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    <p style={styleWarning}>* You need insert inventory before set booking before.</p>
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button 
                                type="submit"
                                color="primary" 
                                onClick={hideModalBookingBefore}>
                                Submit
                            </Button>
                            <Button 
                                color="secondary" 
                                onClick={hideModalBookingBefore}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Form>
                </Modal>

                {/* Modal promotion code */}
                <Modal isOpen={checkModalPromotionCode} toggle={hideModalPromotionCode}>
                    <Form role="form" onSubmit={submitPromotionCode}>
                        <ModalHeader 
                            toggle={hideModalPromotionCode}>
                            Select promotion code
                        </ModalHeader>
                        <ModalBody>
                            <Row>
                                <Col lg="4" md="12">
                                    From date*
                                </Col>
                                <Col lg="8" md="12">
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative mb-3">
                                            <Input 
                                                type="date"
                                                required
                                                onChange={(e) => setFromDate(e.target.value)}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="4" md="12">
                                    To date*
                                </Col>
                                <Col lg="8" md="12">
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative mb-3">
                                        <Input 
                                            type="date"
                                            required
                                            onChange={(e) => setToDate(e.target.value)}
                                        />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="4" md="12">
                                    Promotion code *
                                </Col>
                                <Col lg="8" md="12">
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative mb-3">
                                            <Input 
                                                type="text"
                                                required
                                                onChange={(e) => setPromotionCode(e.target.value)}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    <p style={styleWarning}>* You need insert inventory before set promotion code.</p>
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button 
                                type="submit"
                                color="primary" 
                                onClick={hideModalPromotionCode}>
                                Submit
                            </Button>
                            <Button 
                                color="secondary" 
                                onClick={hideModalPromotionCode}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Form>
                </Modal>

                {/* Modal price adult */}
                <Modal isOpen={checkModalPriceAdult} toggle={hideModalPriceAdult}>
                    <Form role="form" onSubmit={submitPriceAdult}>
                        <ModalHeader 
                            toggle={hideModalPriceAdult}>
                            Select price adult
                        </ModalHeader>
                        <ModalBody>
                            <Row>
                                <Col lg="4" md="12">
                                    From date*
                                </Col>
                                <Col lg="8" md="12">
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative mb-3">
                                            <Input 
                                                type="date"
                                                required
                                                onChange={(e) => setFromDate(e.target.value)}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="4" md="12">
                                    To date*
                                </Col>
                                <Col lg="8" md="12">
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative mb-3">
                                        <Input 
                                            type="date"
                                            required
                                            onChange={(e) => setToDate(e.target.value)}
                                        />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="4" md="12">
                                    Price adult *
                                </Col>
                                <Col lg="8" md="12">
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative mb-3">
                                            <Input 
                                                type="number"
                                                min="0"
                                                required
                                                onChange={(e) => setPriceAdult(e.target.value)}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    <p style={styleWarning}>* You need insert inventory before set price adult.</p>
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button 
                                type="submit"
                                color="primary" 
                                onClick={hideModalPriceAdult}>
                                Submit
                            </Button>
                            <Button 
                                color="secondary" 
                                onClick={hideModalPriceAdult}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Form>
                </Modal>

                {/* Modal price child */}
                <Modal isOpen={checkModalPriceChild} toggle={hideModalPriceChild}>
                    <Form role="form" onSubmit={submitPriceChild}>
                        <ModalHeader 
                            toggle={hideModalPriceChild}>
                            Select price child
                        </ModalHeader>
                        <ModalBody>
                            <Row>
                                <Col lg="4" md="12">
                                    From date*
                                </Col>
                                <Col lg="8" md="12">
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative mb-3">
                                            <Input 
                                                type="date"
                                                required
                                                onChange={(e) => setFromDate(e.target.value)}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="4" md="12">
                                    To date*
                                </Col>
                                <Col lg="8" md="12">
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative mb-3">
                                        <Input 
                                            type="date"
                                            required
                                            onChange={(e) => setToDate(e.target.value)}
                                        />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="4" md="12">
                                    Price child *
                                </Col>
                                <Col lg="8" md="12">
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative mb-3">
                                            <Input 
                                                type="number"
                                                min="0"
                                                required
                                                onChange={(e) => setPriceChild(e.target.value)}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    <p style={styleWarning}>* You need insert inventory before set price child.</p>
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button 
                                type="submit"
                                color="primary" 
                                onClick={hideModalPriceChild}>
                                Submit
                            </Button>
                            <Button 
                                color="secondary" 
                                onClick={hideModalPriceChild}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </>
        );
    }
};

export default CalendarHalfAndOneAgent;
