import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent, Grid } from '@material-ui/core';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from '../../Components/sidebar';
import MainHeader from '../../Components/customer_header';
import Footer from '../../Components/customer_footer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCandyCane, 
    faBoxOpen, 
    faPalette,
    faCookieBite,
    faBreadSlice
} from '@fortawesome/free-solid-svg-icons'; // Ensure these icons are in the solid package


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

// Supplier categories and their respective icons
const supplierCategories = [
    { name: 'Confectionery Ingredients Suppliers', icon: faCandyCane },
    { name: 'Chocolate Suppliers', icon: faCookieBite },
    { name: 'Packaging Suppliers', icon: faBoxOpen },
    { name: 'Baking Equipment Suppliers', icon: faBreadSlice },
    { name: 'Decoration Suppliers', icon: faPalette },
];

// Styles for the dashboard
const useStyles = makeStyles((theme) => ({
    card: {
        height: '200px', // Set a fixed height for cards
        borderRadius: '8px',
        color: 'white',
        display: 'flex', // Align items in the center
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gridContainer: {
        marginTop: theme.spacing(2),
    },
    boxContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: theme.spacing(4),
    },
    chartBox: {
        width: '48%',
        padding: theme.spacing(2),
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
    },
    icon: {
        fontSize: '40px', // Adjust the icon size
        marginBottom: theme.spacing(1),
    },
}));

const Dashboard = () => {
    const classes = useStyles();
    const [categoryCounts, setCategoryCounts] = useState([]);
    const [totalSuppliers, setTotalSuppliers] = useState(0);

    useEffect(() => {
        // Fetch supplier category data from the backend
        const fetchCategoryData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/supplier/category-counts');
                const categoryData = response.data;

                // Calculate total suppliers by summing up individual supplier counts
                const total = categoryData.reduce((acc, category) => acc + category.count, 0);

                setCategoryCounts(categoryData);
                setTotalSuppliers(total); // Update total suppliers
            } catch (error) {
                console.error('Error fetching supplier categories', error);
            }
        };

        fetchCategoryData();
    }, []);

    // Prepare data for charts dynamically based on fetched data
    const barChartData = {
        labels: categoryCounts.map((category) => category.supplierCategory),
        datasets: [
            {
                label: 'Category Count',
                backgroundColor: ['#ff8a80', '#ffb74d', '#4fc3f7', '#9575cd', '#81c784'],
                data: categoryCounts.map((category) => category.count),
            },
        ],
    };

    const pieChartData = {
        labels: categoryCounts.map((category) => category.supplierCategory),
        datasets: [
            {
                data: categoryCounts.map((category) => category.count),
                backgroundColor: ['#ff8a80', '#ffb74d', '#4fc3f7', '#9575cd', '#81c784'],
            },
        ],
    };

    return (
        <Box>
            <MainHeader />
            <Box display="flex">
                <Sidebar />
                <Box flex={1} p={3}>
                    <Typography variant="h4" gutterBottom>
                        Supplier Management Dashboard
                    </Typography>

                    <Grid container spacing={3} className={classes.gridContainer}>
                    {/* Total Suppliers */}
                    <Grid item xs={4}>
                        <Card className={classes.card} style={{ backgroundColor: '#ff8a80' }}>
                            <CardContent>
                                <Typography variant="h6">Total Suppliers</Typography>
                                <Typography variant="h4">{totalSuppliers}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Supplier Categories */}
                    {categoryCounts.map((category, index) => (
                        <Grid item xs={4} key={index}> {/* Change xs={2} to xs={4} */}
                            <Card
                                className={classes.card}
                                style={{
                                    backgroundColor: ['#ff8a80', '#ffb74d', '#4fc3f7', '#9575cd', '#81c784'][index % 5],
                                }}
                            >
                                <CardContent>
                                    {/* Display Font Awesome icon */}
                                    <FontAwesomeIcon icon={supplierCategories[index].icon} className={classes.icon} />
                                    <Typography variant="h6">{category.supplierCategory}</Typography>
                                    <Typography variant="h4">{category.count}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                    {/* Charts */}
                    <Box className={classes.boxContainer}>
                        {/* Bar Chart */}
                        <Box className={classes.chartBox}>
                            <Typography variant="h6" gutterBottom>
                                Supplier Category Distribution
                            </Typography>
                            <Bar data={barChartData} />
                        </Box>

                        {/* Pie Chart */}
                        <Box className={classes.chartBox}>
                            <Typography variant="h6" gutterBottom>
                                Supplier Category Share
                            </Typography>
                            <Pie data={pieChartData} />
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </Box>
    );
};

export default Dashboard;
