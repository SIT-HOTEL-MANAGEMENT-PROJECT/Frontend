import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Localbase from "localbase";
let db = new Localbase("hmctdb");
db.config.debug = false;

const LaundryAdmin = ({isUserAdmin,isAuthenticated}) => {

    const [datas, setDatas] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    const [itemCategoryToAdd, setItemCategoryToAdd] = useState("");
    const [itemAddName, setItemAddName] = useState("");
    const [itemAddCode, setItemAddCode] = useState("");
    const [itemAddRate, setItemAddRate] = useState(0);
    
    const [itemCategoryToDelete, setItemCategoryToDelete] = useState("");
    const [itemCategoryCodesToDelete, setItemCategoryCodesToDelete] = useState([]);
    const [itemDeleteName, setItemDeleteName] = useState("");
    const [itemDeleteCode, setItemDeleteCode] = useState("");
    const [itemDeleteRate, setItemDeleteRate] = useState(0);


    useEffect(() => {
        let adminCheck = () => {
            let res = isUserAdmin();
            if (res.success && res.isAdmin) {
                setIsAdmin(true);
            }
        }
        isAuthenticated();
        adminCheck();
        initialDataFetch();
    }, [])


    const initialDataFetch = async () => {
        try {
            let dt = await db.collection('laundryitems').get();
            if (!dt) { alert("Something Went Wrong"); return; }
            if (dt && !Array.isArray(dt)) { dt = [dt]; }
            if (dt) { setDatas(dt); } else { setDatas([]); }
        } catch (e) {
            console.log("ReservationPageError (checkRoomAvForUpdate) : ", e);
            return { success: false, msg: 'Something Went Wrong' }
        }
    }

    
    const addNewItem = async () => {
        try {
            if(!isAdmin){ alert("Access Denied"); return; }

            if (!itemCategoryToAdd || itemCategoryToAdd === '' || !itemAddCode || itemAddCode === '' ||
                !itemAddName || itemAddName === '' || !itemAddRate || itemAddRate === 0) {
                alert("Invalid Input!"); return;
            }

            let res = await db.collection('laundryitems').doc({ category: itemCategoryToAdd }).get();

            if (!res) { alert("Invalid Category!"); return; }

            let resitems = res?.items;

            resitems.push({ code: itemAddCode, name: itemAddName, price: parseFloat(itemAddRate) });

            await db.collection('laundryitems').doc({ category: itemCategoryToAdd }).update({
                items: resitems
            });

            let dt = await db.collection('laundryitems').get();
            if (dt && !Array.isArray(dt)) { dt = [dt]; }
            if (dt) { setDatas(dt); } else { setDatas([]) }

            setItemCategoryToAdd(''); setItemAddCode(""); setItemAddName(""); setItemAddRate(0);

            alert("Item Added");
        } catch (e) {
            console.log("ReservationPageError (checkRoomAvForUpdate) : ", e);
            alert("Something Went Wrong!")
            return { success: false, msg: 'Something Went Wrong' }
        }
    }

    const deleteExtItem = async () => {
        try {
            if(!isAdmin){ alert("Access Denied"); return; }

            if (!itemCategoryToDelete || itemCategoryToDelete === '' || !itemDeleteCode || itemDeleteCode == '' ||
                !itemDeleteName || itemDeleteName === '' || !itemDeleteRate || itemDeleteRate === 0) {
                alert("Invalid Input!"); return;
            }

            let res = await db.collection('laundryitems').doc({ category: itemCategoryToDelete }).get();

            if (!res) { alert("Invalid Category!"); return; }

            let resitems = res?.items;

            if (!resitems || resitems?.length < 1) { alert("No Items Found!"); return; }

            resitems = resitems.filter(itm => itm.code !== itemDeleteCode);

            await db.collection('laundryitems').doc({ category: itemCategoryToDelete }).update({
                items: resitems
            });

            let dt = await db.collection('laundryitems').get();
            if (dt && !Array.isArray(dt)) { dt = [dt]; }
            if (dt) { setDatas(dt); } else { setDatas([]) }

            setItemCategoryToDelete(""); setItemDeleteCode(""); setItemDeleteName(""); setItemDeleteRate(0);

            alert("Item Deleted!");
        } catch (e) {
            console.log("ReservationPageError (checkRoomAvForUpdate) : ", e);
            alert("Something Went Wrong!")
            return { success: false, msg: 'Something Went Wrong' }
        }
    }

    const updateExtItem = async () => {
        try {
            if(!isAdmin){ alert("Access Denied"); return; }
            
            if (!itemCategoryToDelete || itemCategoryToDelete === '' || !itemDeleteCode || itemDeleteCode == '' ||
                !itemDeleteName || itemDeleteName === '' || !itemDeleteRate || itemDeleteRate === 0) {
                alert("Invalid Input!"); return;
            }

            let res = await db.collection('laundryitems').doc({ category: itemCategoryToDelete }).get();

            if (!res) { alert("Invalid Category!"); return; }

            let resitems = res?.items;

            if (!resitems || resitems?.length < 1) { alert("No Items Found!"); return; }

            if (resitems.some((itm) => itm.code === itemDeleteCode)) {
                resitems = resitems.map((m) => {
                    if (m.code === itemDeleteCode) {
                        return {
                            ...m,
                            name: itemDeleteName,
                            price: parseFloat(itemDeleteRate),
                        };
                    } else {
                        return m;
                    }
                });
            }

            await db.collection('laundryitems').doc({ category: itemCategoryToDelete }).update({
                items: resitems
            });

            let dt = await db.collection('laundryitems').get();
            if (dt && !Array.isArray(dt)) { dt = [dt]; }
            if (dt) { setDatas(dt); } else { setDatas([]) }

            setItemCategoryToDelete(""); setItemDeleteCode(""); setItemDeleteName(""); setItemDeleteRate(0);

            alert("Item Updated!");
        } catch (e) {
            console.log("ReservationPageError (checkRoomAvForUpdate) : ", e);
            alert("Something Went Wrong!")
            return { success: false, msg: 'Something Went Wrong' }
        }
    }

    const getItemCategoryCodes = (cate) => {
        try {
            const codes = datas.find((item) => item.category === cate)?.items ?? [];
            if (codes) { setItemCategoryCodesToDelete(codes); } else { setItemCategoryCodesToDelete([]); }
        } catch (e) {
            console.log("ReservationPageError (checkRoomAvForUpdate) : ", e);
            alert("Something Went Wrong!")
            return { success: false, msg: 'Something Went Wrong' }
        }
    }

    const handleInputChange = (e) => {
        if (e.target.name == "itemcategorytoadd") {
            setItemCategoryToAdd(e.target.value);
        }
        else if (e.target.name == "itemaddname") {
            setItemAddName(e.target.value);
        }
        else if (e.target.name == "itemaddcode") {
            setItemAddCode(e.target.value);
        }
        else if (e.target.name == "itemaddrate") {
            setItemAddRate(e.target.value);
        }
        else if (e.target.name == "itemcategorytodelete") {
            setItemCategoryToDelete(e.target.value);
            if (e.target.value && e.target.value !== '') { getItemCategoryCodes(e.target.value); }
            else { setItemCategoryCodesToDelete([]); }
        }
        else if (e.target.name == "itemdeletecode") {
            setItemDeleteCode(e.target.value);

            if (e.target.value && e.target.value !== '') {
                const selectedItem = itemCategoryCodesToDelete.find(item => item.code === e.target.value);
                setItemDeleteName(selectedItem?.name);
                setItemDeleteRate(parseFloat(selectedItem?.price));
            } else {
                setItemDeleteName('');
                setItemDeleteRate(0);
            }
        }
        else if (e.target.name == "itemdeletename") {
            setItemDeleteName(e.target.value);
        }
        else if (e.target.name == "itemdeleterate") {
            setItemDeleteRate(e.target.value);
        }
    }

    const addItem = async(e) => {
        e.preventDefault();
        await addNewItem();
    }

    const deleteItem = async(e) => {
        e.preventDefault();
        await deleteExtItem();
    }

    const updateItem = async(e) => {
        e.preventDefault();
        await updateExtItem();
    }


    return (
        <div>
            <div className='bg-light min-height-vh'>
                <nav className="navbar sticky-top navbar navbar-expand-lg bg-light">
                    <div className="container-fluid">
                        <div className="navbar-brand d-flex align-items-center">
                            <NavLink className="text-primary" to="/Home4">
                                <i className="bx bx-chevrons-left font-size-25"></i>
                            </NavLink>
                            <h5 className="text-primary">Laundry Service Admin</h5>
                        </div>
                    </div>
                </nav>
                <div className="d-flex flex-column reserv-row-gap-2 align-items-center justify-content-center container bg-skyblue p-2">
                    <div className='d-flex justify-content-between width-90percent reserv-col-gap-1 mt-4 mb-4'>
                        <div className='col-md-6 flex-column border-full-blue border-radius-10 p-2'>
                            <div className="d-flex align-items-center flex-wrap">
                                <label
                                    htmlFor="itemcategorytoadd"
                                    className="col-sm-3 col-form-label font-size-14 medium-width-40percent"
                                >
                                    Item Category{" "}
                                </label>
                                <div className="col-sm-8 medium-width-60percent">
                                    <select
                                        id="itemcategorytoadd"
                                        className="form-select font-size-14 background-gray height-30"
                                        name="itemcategorytoadd"
                                        value={itemCategoryToAdd}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value={""}> </option>
                                        {datas.length >= 1 && datas.map((item, index) => {
                                            return <option key={index + 1} value={item?.category}>{item?.category}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="d-flex align-items-center flex-wrap font-size-14 rev-margin-gap">
                                <label htmlFor="itemaddcode" className="col-sm-3 col-form-label medium-width-40percent">
                                    Item Code{" "}
                                </label>
                                <div className="col-sm-8 medium-width-60percent">
                                    <input
                                        type="text"
                                        className="form-control height-30 font-size-14 background-gray"
                                        id="inputItemAddCode"
                                        name="itemaddcode"
                                        value={itemAddCode}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="d-flex align-items-center flex-wrap font-size-14 rev-margin-gap">
                                <label htmlFor="itemaddname" className="col-sm-3 col-form-label medium-width-40percent">
                                    Item Name{" "}
                                </label>
                                <div className="col-sm-8 medium-width-60percent">
                                    <input
                                        type="text"
                                        className="form-control height-30 font-size-14 background-gray"
                                        id="inputItemAddName"
                                        name="itemaddname"
                                        value={itemAddName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="d-flex align-items-center flex-wrap rev-margin-gap">
                                <label
                                    htmlFor="itemaddrate"
                                    className="col-sm-3 col-form-label font-size-14 medium-width-40percent"
                                >
                                    Rate{" "}
                                </label>
                                <div className="col-sm-8 medium-width-60percent">
                                    <input
                                        type="number"
                                        className="form-control height-30 font-size-14 background-gray"
                                        id="inputItemAddRate"
                                        name="itemaddrate"
                                        min='0'
                                        value={itemAddRate}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-end mt-4 padding-right-40">
                                <button className="d-flex align-items-center justify-content-center width-150 font-size-16 text-primary btn button-color-onHover height-40 button-padding-5" onClick={(e) => { addItem(e) }}>
                                    Add Item
                                </button>
                            </div>
                        </div>
                        <div className='col-md-6 flex-column border-full-blue border-radius-10 p-2'>
                            <div className="d-flex align-items-center flex-wrap">
                                <label
                                    htmlFor="itemcategorytodelete"
                                    className="col-sm-3 col-form-label font-size-14 medium-width-40percent"
                                >
                                    Item Category{" "}
                                </label>
                                <div className="col-sm-8 medium-width-60percent">
                                    <select
                                        id="itemcategorytodelete"
                                        className="form-select font-size-14 background-gray height-30"
                                        name="itemcategorytodelete"
                                        value={itemCategoryToDelete}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value={""}> </option>
                                        {datas.length >= 1 && datas.map((item, index) => {
                                            return <option key={index + 1} value={item?.category}>{item?.category}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="d-flex align-items-center flex-wrap font-size-14 rev-margin-gap">
                                <label htmlFor="itemdeletecode" className="col-sm-3 col-form-label medium-width-40percent">
                                    Item Code{" "}
                                </label>
                                <div className="col-sm-8 medium-width-60percent">
                                    <select
                                        id="itemdeletecode"
                                        className="form-select font-size-14 background-gray height-30"
                                        name="itemdeletecode"
                                        value={itemDeleteCode}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value={""}> </option>
                                        {itemCategoryCodesToDelete.length >= 1 && itemCategoryCodesToDelete.map((item, index) => {
                                            return <option key={index + 1} value={item?.code}>{item?.code}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="d-flex align-items-center flex-wrap font-size-14 rev-margin-gap">
                                <label htmlFor="itemdeletename" className="col-sm-3 col-form-label medium-width-40percent">
                                    Item Name{" "}
                                </label>
                                <div className="col-sm-8 medium-width-60percent">
                                    <input
                                        type="text"
                                        className="form-control height-30 font-size-14 background-gray"
                                        id="inputItemDeleteName"
                                        name="itemdeletename"
                                        value={itemDeleteName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="d-flex align-items-center flex-wrap rev-margin-gap">
                                <label
                                    htmlFor="itemdeleterate"
                                    className="col-sm-3 col-form-label font-size-14 medium-width-40percent"
                                >
                                    Rate{" "}
                                </label>
                                <div className="col-sm-8 medium-width-60percent">
                                    <input
                                        type="number"
                                        className="form-control height-30 font-size-14 background-gray"
                                        id="inputItemDeleteRate"
                                        name="itemdeleterate"
                                        min='0'
                                        value={itemDeleteRate}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-end reserv-col-gap-10p mt-4 padding-right-40">
                                <button className="d-flex align-items-center justify-content-center width-150 font-size-16 text-primary btn button-color-onHover height-40 button-padding-5" onClick={(e) => { updateItem(e) }}>
                                    Update Item
                                </button>
                                <button className="d-flex align-items-center justify-content-center width-150 font-size-16 text-primary btn button-color-onHover height-40 button-padding-5" onClick={(e) => { deleteItem(e) }}>
                                    Delete Item
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LaundryAdmin