import React from 'react';

const AdminDashboard: React.FC = () => {
    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <div className="dashboard-content">
                <section className="manage-products">
                    <h2>Manage Products</h2>
                    {/* Add functionality to manage products here */}
                </section>
                <section className="view-orders">
                    <h2>View Orders</h2>
                    {/* Add functionality to view orders here */}
                </section>
            </div>
        </div>
    );
};

export default AdminDashboard;