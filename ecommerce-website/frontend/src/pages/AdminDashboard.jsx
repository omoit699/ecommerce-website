import React from 'react';

const AdminDashboard = () => {
    return (
        <div className="container">
            <div className="admin-dashboard">
                <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Admin Dashboard</h1>
                
                <div className="dashboard-content" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
                    
                    {/* Products Management Column */}
                    <section className="manage-products" style={{ border: '1px solid #F1F1F2', padding: '20px', borderRadius: '4px', backgroundColor: '#FFFFFF' }}>
                        <h2 style={{ borderBottom: '2px solid #F68B1E', paddingBottom: '10px', color: '#313131' }}>Manage Products</h2>
                        <p style={{ color: '#75757A', fontSize: '14px' }}>Add new items, update pricing, or edit your current inventory.</p>
                        {/* Dynamic management tools will inject here later */}
                    </section>
                    
                    {/* Orders Review Column */}
                    <section className="view-orders" style={{ border: '1px solid #F1F1F2', padding: '20px', borderRadius: '4px', backgroundColor: '#FFFFFF' }}>
                        <h2 style={{ borderBottom: '2px solid #3B3B3B', paddingBottom: '10px', color: '#313131' }}>View Orders</h2>
                        <p style={{ color: '#75757A', fontSize: '14px' }}>Track processing customer shipments and pending payments.</p>
                        {/* Dynamic order tracking items will inject here later */}
                    </section>
                    
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
