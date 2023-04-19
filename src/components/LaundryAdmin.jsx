import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const LaundryAdmin = () => {
    const [itemCategoryToAdd, setItemCategoryToAdd] = useState("");
    const [itemCategoryToDelete, setItemCategoryToDelete] = useState("");
    const [itemAddName, setItemAddName] = useState("");
    const [itemAddCode, setItemAddCode] = useState("");
    const [itemAddRate, setItemAddRate] = useState("");
    const [itemDeleteName, setItemDeleteName] = useState("");
    const [itemDeleteCode, setItemDeleteCode] = useState("");
    const [itemDeleteRate, setItemDeleteRate] = useState("");

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
        }
        else if (e.target.name == "itemdeletecode") {
            setItemDeleteCode(e.target.value);
        }
        else if (e.target.name == "itemdeletename") {
            setItemDeleteName(e.target.value);
        }
        else if (e.target.name == "itemdeleterate") {
            setItemDeleteRate(e.target.value);
        }
    }

    const addItem = (e) => {
        e.preventDefault();
        console.log(itemCategoryToAdd);
        console.log(itemAddCode);
        console.log(itemAddName);
        console.log(itemAddRate);
    }

    const deleteItem = (e) => {
        e.preventDefault();
        console.log(itemCategoryToDelete);
        console.log(itemDeleteCode);
        console.log(itemDeleteName);
        console.log(itemDeleteRate);
    }

    const updateItem = (e) => {
        e.preventDefault();
        console.log(itemCategoryToDelete);
        console.log(itemDeleteCode);
        console.log(itemDeleteName);
        console.log(itemDeleteRate);
    }


    return (
        <div>
            <div className='bg-light min-height-vh'>
                <nav className="navbar sticky-top navbar navbar-expand-lg bg-light">
                    <div className="container-fluid">
                        <div className="navbar-brand d-flex align-items-center">
                            <NavLink className="text-primary" to="/Home3">
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
                                        <option value={"Salad"}>Salad</option>
                                        <option value={"Rice"}>Rice</option>
                                        <option value={"Lunch"}>Lunch</option>
                                        <option value={"Beverages"}>Beverages</option>
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
                                        type="text"
                                        className="form-control height-30 font-size-14 background-gray"
                                        id="inputItemAddRate"
                                        name="itemaddrate"
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
                                        <option value={"Salad"}>Salad</option>
                                        <option value={"Rice"}>Rice</option>
                                        <option value={"Lunch"}>Lunch</option>
                                        <option value={"Beverages"}>Beverages</option>
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
                                        <option value={"A1"}>A1</option>
                                        <option value={"A2"}>A2</option>
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
                                        type="text"
                                        className="form-control height-30 font-size-14 background-gray"
                                        id="inputItemDeleteRate"
                                        name="itemdeleterate"
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