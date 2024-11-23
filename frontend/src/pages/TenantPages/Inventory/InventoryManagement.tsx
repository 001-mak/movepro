import React, { useState, useEffect , useRef } from 'react';
import axios from 'axios';
import { putApiCall, getApiCall, postApiCall, deleteApiCall } from '../../../services/api-service';
import {
    FaBox,
    FaTimes,
    FaEdit,
    FaExclamationTriangle, FaChevronDown
} from 'react-icons/fa';
import { MdDeleteOutline } from "react-icons/md";
import { toast } from 'react-toastify';

interface InventoryItem {
    id?: number;
    item_name: string;
    item_size: string;
    group_id?: number;
}

interface InventoryGroup {
    id?: number;
    group_name: string;
    company_id?: number;
}

const InventoryManagement = () => {
    const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
    const [newItemName, setNewItemName] = useState('');
    const [newItemSize, setNewItemSize] = useState('');
    const [showAddGroupModal, setShowAddGroupModal] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');
    const [inventoryGroups, setInventoryGroups] = useState<InventoryGroup[]>([]);
    const [currentGroupItems, setCurrentGroupItems] = useState<InventoryItem[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    // state for edit functionality
    const [showEditModal, setShowEditModal] = useState(false);
    const [editItem, setEditItem] = useState<InventoryItem | null>(null);
    const [editItemName, setEditItemName] = useState('');
    const [editItemSize, setEditItemSize] = useState('');
    // states for delete confirmation modals
    const [showDeleteGroupModal, setShowDeleteGroupModal] = useState(false);
    const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<InventoryItem | null>(null);

    // Create refs for the modal content
    const addModalRef = useRef<HTMLDivElement>(null);
    const editModalRef = useRef<HTMLDivElement>(null);
    const deleteGroupModalRef = useRef<HTMLDivElement>(null);
    const deleteItemModalRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);



    // Fetch inventory groups on component mount
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const response = await getApiCall(`/inventory/inventory-group`);
                setInventoryGroups(response.data);

                if (response.data.length > 0) {
                    const firstGroupId = response.data[0].id;
                    setSelectedGroup(firstGroupId);
                    await fetchGroupItems(firstGroupId);
                }
            } catch (error) {
                console.error('Error fetching inventory groups:', error);
            }
        };

        fetchInitialData();
    }, []);

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isDropdownOpen && 
                dropdownRef.current && 
                !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
            // ... existing modal click outside handlers ...
            if (showAddGroupModal && 
                addModalRef.current && 
                !addModalRef.current.contains(event.target as Node)) {
                setShowAddGroupModal(false);
            }
            
            if (showEditModal && 
                editModalRef.current && 
                !editModalRef.current.contains(event.target as Node)) {
                setShowEditModal(false);
            }

            if (showDeleteGroupModal && 
                deleteGroupModalRef.current && 
                !deleteGroupModalRef.current.contains(event.target as Node)) {
                setShowDeleteGroupModal(false);
            }

            if (showDeleteItemModal && 
                deleteItemModalRef.current && 
                !deleteItemModalRef.current.contains(event.target as Node)) {
                setShowDeleteItemModal(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen, showAddGroupModal, showEditModal, showDeleteGroupModal, showDeleteItemModal]);



    const fetchGroupItems = async (groupId: number) => {
        try {
            const response = await getApiCall(`/inventory/inventory-group-item/sub-items/${groupId}`);
            // Ensure we always set an array, even if empty
            setCurrentGroupItems(response.data || []);
        } catch (error) {
            console.error('Error fetching group items:', error);
            setCurrentGroupItems([]); // Set empty array on error
        }
    };

    const handleGroupSelect = (groupId: number) => {
        setSelectedGroup(groupId);
        setCurrentGroupItems([]); // Reset before fetching new items
        fetchGroupItems(groupId);
    };

    const handleAddGroup = async () => {
        if (newGroupName) {
            try {
                const response = await postApiCall('/inventory/inventory-group', {
                    group_name: newGroupName
                });

                const newGroup = response.data;
                setInventoryGroups(prev => [...prev, newGroup]);
                setSelectedGroup(newGroup.id);
                setCurrentGroupItems([]); // Initialize empty array for new group
                setNewGroupName('');
                setShowAddGroupModal(false);
                toast.success('Group added successfully');
            } catch (error) {
                console.error('Error adding inventory group:', error);
                toast.error('Error adding group, please try again');
            }
        }
    };

    const handleDeleteGroupClick = () => {
        setShowDeleteGroupModal(true);
    };

    const handleDeleteGroupConfirm = async () => {
        if (selectedGroup) {
            try {
                await deleteApiCall(`/inventory/inventory-group/${selectedGroup}`);
                const updatedGroups = inventoryGroups.filter(group => group.id !== selectedGroup);
                setInventoryGroups(updatedGroups);
                toast.success('Group deleted successfully');

                if (updatedGroups.length > 0) {
                    const firstGroupId = updatedGroups[0].id!;
                    setSelectedGroup(firstGroupId);
                    fetchGroupItems(firstGroupId);
                } else {
                    setSelectedGroup(null);
                    setCurrentGroupItems([]);
                }
                setShowDeleteGroupModal(false);
            } catch (error) {
                console.error('Error deleting group:', error);
                toast.error('Error in group deleting, Please try again');
            }
        }
    };




    const handleDeleteItemClick = (item: InventoryItem) => {
        setItemToDelete(item);
        setShowDeleteItemModal(true);
    };


    const handleAddItem = async () => {
        if (newItemName && newItemSize && selectedGroup) {
            try {
                const newItem = {
                    item_name: newItemName,
                    item_size: `${newItemSize} cu Ft`,
                    group_id: selectedGroup
                };

                const response = await postApiCall('/inventory/inventory-group-item', newItem);

                // Ensure currentGroupItems is always an array before updating
                setCurrentGroupItems(prevItems => {
                    const items = Array.isArray(prevItems) ? prevItems : [];
                    return [...items, response.data];
                });

                // Reset input fields
                setNewItemName('');
                setNewItemSize('');
                toast.success('Item added successfully');
            } catch (error) {
                console.error('Error adding item:', error);
                toast.error('Error in adding item, Please try again');
            }
        }
    };

    const handleDeleteItemConfirm = async () => {
        if (itemToDelete?.id) {
            try {
                await deleteApiCall(`/inventory/inventory-group-item/${itemToDelete.id}`);
                setCurrentGroupItems(prevItems => prevItems.filter(item => item.id !== itemToDelete.id));
                toast.success('Item deleted successfully');
                setShowDeleteItemModal(false);
                setItemToDelete(null);
            } catch (error) {
                console.error('Error deleting item:', error);
                toast.error('Error in item deleting, Please try again');
            }
        }
    };

    
    const handleEditClick = (item: InventoryItem) => {
        setEditItem(item);
        setEditItemName(item.item_name);
        // Extract the numeric value from the size string (remove "cu Ft")
        setEditItemSize(item.item_size.replace(' cu Ft', ''));
        setShowEditModal(true);
    };

    const handleEditSave = async () => {
        if (editItem?.id && editItemName && editItemSize) {
            try {
                const updatedItem = {
                    item_name: editItemName,
                    item_size: `${editItemSize} cu Ft`,
                    group_id: selectedGroup
                };

                const response = await putApiCall(`/inventory/inventory-group-item/${editItem.id}`, updatedItem);

                // Update the item in the current items list
                setCurrentGroupItems(prevItems =>
                    prevItems.map(item =>
                        item.id === editItem.id ? response.data : item
                    )
                );

                setShowEditModal(false);
                setEditItem(null);
                setEditItemName('');
                setEditItemSize('');
                toast.success('Item updated successfully');
            } catch (error) {
                console.error('Error updating item:', error);
                toast.error('Error in updating item, Please try again');
            }
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-boxdark">
            {/* Header */}
            <div className="border-b border-stroke dark:border-strokedark">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Inventory</div>
                            <h1 className="text-xl text-gray-800 dark:text-white">Inventory Groups</h1>
                        </div>
                        <button
                            onClick={() => setShowAddGroupModal(true)}
                            className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
                        >
                            Add Inventory Group
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-6">
                {/* Mobile Dropdown for Groups */}
                <div className="block lg:hidden mb-6" ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full p-3 bg-white dark:bg-boxdark rounded-lg border border-stroke dark:border-strokedark flex justify-between items-center"
                    >
                        <span className="flex items-center">
                            <FaBox className="mr-2" />
                            {inventoryGroups.find(g => g.id === selectedGroup)?.group_name || 'Select Group'}
                        </span>
                        <FaChevronDown className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isDropdownOpen && (
                        <div className="absolute z-10 w-full max-w-[calc(100%-2rem)] mt-1 bg-white dark:bg-boxdark rounded-lg border border-stroke dark:border-strokedark shadow-lg">
                            {inventoryGroups.map(group => (
                                <button
                                    key={group.id}
                                    onClick={() => {
                                        handleGroupSelect(group.id!);
                                        setIsDropdownOpen(false);
                                    }}
                                    className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-boxdark-2 
                                    ${selectedGroup === group.id ? 'bg-teal-50 dark:bg-boxdark-2 text-teal-500 dark:text-teal-400' : 'text-gray-700 dark:text-gray'}`}
                                >
                                    <FaBox className="mr-3" />
                                    {group.group_name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar - Hidden on mobile */}
                    <div className="hidden lg:block w-64 flex-shrink-0">
                        <div className="bg-white dark:bg-boxdark rounded-lg border border-stroke dark:border-strokedark overflow-hidden">
                            {inventoryGroups.map(group => (
                                <button
                                    key={group.id}
                                    onClick={() => handleGroupSelect(group.id!)}
                                    className={`w-full flex items-center px-4 py-3 text-left border-b border-stroke dark:border-strokedark hover:bg-gray-50 dark:hover:bg-boxdark-2 
                                    ${selectedGroup === group.id ? 'bg-teal-50 dark:bg-boxdark-2 text-teal-500 dark:text-teal-400' : 'text-gray-700 dark:text-gray'}`}
                                >
                                    <span className="mr-3"><FaBox /></span>
                                    {group.group_name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1">
                        {selectedGroup && (
                            <div className="bg-white dark:bg-boxdark rounded-lg border border-stroke dark:border-strokedark p-4 sm:p-6">
                                <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                        {inventoryGroups.find(g => g.id === selectedGroup)?.group_name}
                                    </h2>
                                    <button
                                        onClick={handleDeleteGroupClick}
                                        className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                                    >
                                        Delete Group
                                    </button>
                                </div>

                                {/* Scrollable Table Container */}
                                <div className="overflow-x-auto -mx-4 sm:mx-0">
                                    <div className="inline-block min-w-full align-middle">
                                        <table className="min-w-full">
                                            <thead className="bg-gray-50 dark:bg-boxdark-2">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-gray-700 dark:text-gray whitespace-nowrap">Item Name</th>
                                                    <th className="px-6 py-3 text-left text-gray-700 dark:text-gray whitespace-nowrap">Size</th>
                                                    <th className="px-6 py-3 text-left text-gray-700 dark:text-gray whitespace-nowrap">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 dark:divide-strokedark">
                                                {currentGroupItems.length > 0 ? (
                                                    currentGroupItems.map((item) => (
                                                        <tr key={item.id} className="text-gray-700 dark:text-gray">
                                                            <td className="px-6 py-4 whitespace-nowrap">{item.item_name}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap">{item.item_size}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex gap-4">
                                                                    <button
                                                                        onClick={() => handleEditClick(item)}
                                                                        className="text-blue-500 hover:text-blue-700"
                                                                    >
                                                                        <FaEdit className="text-xl" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDeleteItemClick(item)}
                                                                        className="text-red-500 hover:text-red-700"
                                                                    >
                                                                        <MdDeleteOutline className="text-xl" />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={3} className="text-center py-4 text-gray-500">
                                                            No data available.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Add New Item Form */}
                                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-strokedark">
                                    <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">
                                        Add New Item
                                    </h3>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <input
                                            type="text"
                                            placeholder="Item Name"
                                            value={newItemName}
                                            onChange={(e) => setNewItemName(e.target.value)}
                                            className="flex-1 px-4 py-2 border border-gray-300 dark:border-strokedark rounded-md bg-white dark:bg-boxdark text-gray-700 dark:text-gray-300"
                                        />
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                                            <div className='flex pb-2 sm:pb-0'>
                                            <input
                                                type="number"
                                                placeholder="Size"
                                                value={newItemSize}
                                                onChange={(e) => setNewItemSize(e.target.value)}
                                                className="w-full sm:w-24 px-4 py-2 border border-gray-300 dark:border-strokedark rounded-md bg-white dark:bg-boxdark text-gray-700 dark:text-gray-300"
                                            />
                                            <span className="text-gray-600 dark:text-gray-400 flex flex-col justify-center pl-2">cuFt</span>
                                            </div>
                                            
                                            <button
                                                onClick={handleAddItem}
                                                className="w-full sm:w-auto px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
                                            >
                                                Add Item
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Add Group Modal */}
            {showAddGroupModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" >
                    <div className="bg-white dark:bg-boxdark rounded-lg p-6 w-96" ref={addModalRef}>
                    <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                                Add New Inventory Group
                            </h3>
                            <button
                                onClick={() => setShowAddGroupModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <input
                            type="text"
                            placeholder="Group Name"
                            value={newGroupName}
                            onChange={(e) => setNewGroupName(e.target.value)}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary mb-5"
                        />
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowAddGroupModal(false)}
                                className="px-4 py-2 text-gray hover:text-gray-800 dark:hover:text-gray-200 bg-red-500"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddGroup}
                                className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
                            >
                                Add Group
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" >
                    <div className="bg-white dark:bg-boxdark rounded-lg p-6 w-96" ref={editModalRef}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                                Edit Item
                            </h3>
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <input
                            type="text"
                            placeholder="Item Name"
                            value={editItemName}
                            onChange={(e) => setEditItemName(e.target.value)}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary mb-4"
                        />
                        <div className="flex items-center gap-2 mb-6">
                            <input
                                type="number"
                                placeholder="Size"
                                value={editItemSize}
                                onChange={(e) => setEditItemSize(e.target.value)}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                            <span className="text-gray-600 dark:text-gray">cuFt</span>
                        </div>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="px-4 py-2  bg-red-500 text-gray hover:text-gray-800 dark:hover:text-gray"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEditSave}
                                className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showDeleteGroupModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div ref={deleteGroupModalRef} className="bg-white dark:bg-boxdark rounded-lg p-6 w-96">
                        <div className="flex items-center mb-4 text-red-500">
                            <FaExclamationTriangle className="text-2xl mr-2" />
                            <h3 className="text-lg font-medium">Confirm Deletion</h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Are you sure you want to delete the group "
                            {inventoryGroups.find(g => g.id === selectedGroup)?.group_name}"?
                            This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowDeleteGroupModal(false)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteGroupConfirm}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                            >
                                Yes, Delete Group
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* New Delete Item Confirmation Modal */}
            {showDeleteItemModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div ref={deleteItemModalRef} className="bg-white dark:bg-boxdark rounded-lg p-6 w-96">
                        <div className="flex items-center mb-4 text-red-500">
                            <FaExclamationTriangle className="text-2xl mr-2" />
                            <h3 className="text-lg font-medium">Confirm Deletion</h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Are you sure you want to delete the item "
                            {itemToDelete?.item_name}"?
                            This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => {
                                    setShowDeleteItemModal(false);
                                    setItemToDelete(null);
                                }}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteItemConfirm}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                            >
                                Yes, Delete Item
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InventoryManagement;