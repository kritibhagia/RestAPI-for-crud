import React, { Component, useState, useEffect } from 'react';
//import { Route } from 'react-router';
//import { Layout } from './components/Layout';
//import { Home } from './components/Home';
//import { FetchData } from './components/FetchData';
//import { Counter } from './components/Counter';

import './custom.css'

//import React, { useState, useEffect } from 'react';

function App() {
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState('');
    const [itemCourse, setItemCourse] = useState('');
    const [itemIdToUpdate, setItemIdToUpdate] = useState(null);

    const fetchItems = async () => {
        try {
            const response = await fetch('/api/items');
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleAddItem = async () => {
        try {
            const response = await fetch('/api/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ StName: itemName, Course:itemCourse }),
               
            });
            if (response.ok) {
                fetchItems();
                setItemName('');
                setItemCourse('');
            } else {
                console.error('Failed to add item');
            }
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };
    const handleUpdateItem = async () => {
        if (!itemIdToUpdate) return;

        try {
            const response = await fetch(`/api/items/${itemIdToUpdate}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({StName: itemName , Course:itemCourse}),
            });
            if (response.ok) {
                fetchItems();
                setItemIdToUpdate(null);
                setItemName('');
                setItemCourse('');
            } else {
                console.error('Failed to update item');
            }
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    //Delete the items
    const handleDeleteItem = async (id) => {
        try {
            const response = await fetch(`/api/items/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchItems();
            } else {
                console.error('Failed to delete item');
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    //Edit the items
    const handleEditItem = (item) => {
        setItemIdToUpdate(item.id);
        setItemName(item.stName);
        setItemCourse(item.course);
    };


    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor:'LightCyan'}}>
            <h1 style={{ textAlign: 'center', fontSize: '24px', color: 'MidnightBlue', marginBottom: '60px', marginTop:'30px' }}><b> Student Details</b></h1><br />
            <span style={{ marginLeft: '580px', color: 'RoyalBlue', paddingBottom: '0px' }}><b>Name</b></span ><span style={{ marginLeft: '20px', color: 'RoyalBlue', paddingBottom: '0px' }}><b>Course</b></span>

            <ul style={{ listStyle: 'none', paddingTop: '0px', marginTop: '0px', textAlign: 'center' }}>
                {items.map((item) => (
                    <li key={item.id} style={{ marginBottom: '10px', }}><br />
                        <span style={{ marginRight: '30px', color:'Black' }}>{item.stName}{'  '}</span>
                        <span style={{ marginRight: '10px', color: 'Black' }}>{item.course}{'  '}</span>
                        <button style={{
                            marginTop:'10px',
                            marginLeft: '60px',
                            padding: '5px 10px',
                            backgroundColor: 'SkyBlue',
                            color: 'Beige',
                            border: 'none',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            textAlign:'center',
                        }}
                            onClick={() => handleEditItem(item)}>Edit</button>{' '} &nbsp; &nbsp;
                        <button style={{
                            padding: '5px 10px',
                            backgroundColor: 'Crimson',
                            color: 'Beige',
                            border: 'none',
                            borderRadius: '12px',
                            cursor: 'pointer',
                        }}
                                onClick={() => handleDeleteItem(item.id)}>Delete</button>
                    </li>
                ))}
            </ul><br/>
            {itemIdToUpdate ? (
                <div style={{ marginTop: '60px', marginLeft: '450px', }}>
                    <span style={{ color: 'RoyalBlue', marginRight: '10px' }}><b>Name</b></span>
                    <input
                        type="text"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        style={{ marginRight: '10px', padding: '5px' }}
                    />

                    <span style={{ color: 'RoyalBlue', marginRight: '10px' }}><b>Course</b></span>
                    <input
                        type="text"
                        value={itemCourse}
                        onChange={(e) => setItemCourse(e.target.value)}
                        style={{ marginRight: '10px', padding: '5px' }}
                    />
                    <button onClick={handleUpdateItem} style={{
                        padding: '5px 10px',
                        backgroundColor: 'SteelBlue',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer',
                    }}
                    >Update</button>
                </div>
            ) : (
                    <div style={{ marginTop: '60px', marginLeft: '450px' }}>
                        <span style={{ color: 'RoyalBlue', marginRight: '10px' }}><b>Name</b></span>
                    <input
                        type="text"
                        value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            style={{ marginRight: '10px', padding: '5px' }}
                        />
                        <span style={{ color: 'RoyalBlue', marginRight: '10px' }}><b>Course</b></span>
                        <input
                            type="text"
                            value={itemCourse}
                            onChange={(e) => setItemCourse(e.target.value)}
                            style={{ marginRight: '10px', padding: '5px' }}
                        />
                        <button onClick={handleAddItem} style={{
                            padding: '5px 10px',
                            backgroundColor: 'SteelBlue',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            cursor: 'pointer',
                        }}
                        >Add Item</button>
                </div>
            )}
        </div>
    );
}

export default App;

