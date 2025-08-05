// Dashboard State Management
let currentTab = 'customer';
let filteredData = [];
let selectedRow = null;
let totalRecordsChart = null;
let failedRecordsChart = null;
let chartsCollapsed = false;

// Sample data for different tabs
const sampleData = {
    customer: [
        { 
            flow: 'SHP → NS', 
            internal_id: '12545', 
            external_id: 'mhi-ns90-test-store.SHP.Customer_7963945107543', 
            name: 'Evita Evans', 
            email: 'mhi_vitaevans@yahoo.com',
            date: '2024-01-15 10:30:00', 
            stage: 'target', 
            status: 'success', 
            error_msg: '', 
            last_update: '2024-01-15 10:35:00',
            process_id: 'hujv4HEgEfCNWg3rq0agKw'
        },
        { 
            flow: 'SHP → NS', 
            internal_id: '12546', 
            external_id: 'mhi-ns90-test-store.SHP.Customer_7963945107544', 
            name: 'Marcus Rodriguez', 
            email: 'marcus.rodriguez@hotmail.com',
            date: '2024-01-15 11:15:00', 
            stage: 'prepared', 
            status: 'success', 
            error_msg: '', 
            last_update: '2024-01-15 11:20:00',
            process_id: 'k2mN8FgHdEfCNWg3rq0agLx'
        },
        { 
            flow: 'SHP → NS', 
            internal_id: '12547', 
            external_id: 'mhi-ns90-test-store.SHP.Customer_7963945107545', 
            name: 'Sarah Johnson', 
            email: 'sarah.johnson@gmail.com',
            date: '2024-01-15 12:00:00', 
            stage: 'landed', 
            status: 'ready', 
            error_msg: '', 
            last_update: '2024-01-15 12:05:00',
            process_id: 'p9qR5TgVdEfCNWg3rq0agMy'
        },
        { 
            flow: 'SHP → NS', 
            internal_id: '12548', 
            external_id: 'mhi-ns90-test-store.SHP.Customer_7963945107546', 
            name: 'David Chen', 
            email: 'david.chen@outlook.com',
            date: '2024-01-15 13:30:00', 
            stage: 'landed', 
            status: 'failed', 
            error_msg: 'Invalid email format', 
            last_update: '2024-01-15 13:35:00',
            process_id: 'w3xZ7BgCdEfCNWg3rq0agNz'
        },
        { 
            flow: 'SHP → NS', 
            internal_id: '12549', 
            external_id: 'mhi-ns90-test-store.SHP.Customer_7963945107547', 
            name: 'Lisa Thompson', 
            email: 'lisa.thompson@yahoo.com',
            date: '2024-01-15 14:45:00', 
            stage: 'prepared', 
            status: 'failed', 
            error_msg: 'Customer already exists', 
            last_update: '2024-01-15 14:50:00',
            process_id: 'a1bC4DgFdEfCNWg3rq0agOp'
        },
        { 
            flow: 'SHP → NS', 
            internal_id: '12550', 
            external_id: 'mhi-ns90-test-store.SHP.Customer_7963945107548', 
            name: 'Michael Brown', 
            email: 'michael.brown@hotmail.com',
            date: '2024-01-15 15:20:00', 
            stage: 'target', 
            status: 'success', 
            error_msg: '', 
            last_update: '2024-01-15 15:25:00',
            process_id: 'e5fG8HgIdEfCNWg3rq0agQr'
        },
        { 
            flow: 'SHP → NS', 
            internal_id: '12551', 
            external_id: 'mhi-ns90-test-store.SHP.Customer_7963945107549', 
            name: 'Jennifer Davis', 
            email: 'jennifer.davis@gmail.com',
            date: '2024-01-15 16:10:00', 
            stage: 'landed', 
            status: 'ready', 
            error_msg: '', 
            last_update: '2024-01-15 16:15:00',
            process_id: 'i9jK2LgMdEfCNWg3rq0agSt'
        },
        { 
            flow: 'SHP → NS', 
            internal_id: '12552', 
            external_id: 'mhi-ns90-test-store.SHP.Customer_7963945107550', 
            name: 'Robert Wilson', 
            email: 'robert.wilson@outlook.com',
            date: '2024-01-15 17:00:00', 
            stage: 'prepared', 
            status: 'success', 
            error_msg: '', 
            last_update: '2024-01-15 17:05:00',
            process_id: 'u7vW0XgYdEfCNWg3rq0agUv'
        }
    ],
    deposit: [
        { 
            flow: 'SHP → NS', 
            internal_id: '12553', 
            external_id: 'mhi-ns90-test-store.SHP.Deposit_7963945107601', 
            name: 'CD-12553', 
            customer_name: 'Evita Evans',
            amount: 1500.00,
            payment_method: 'Credit Card',
            payment_id: 'PAY-CC-2024-001',
            date: '2024-01-15 10:30:00', 
            stage: 'target', 
            status: 'success', 
            error_msg: '', 
            last_update: '2024-01-15 10:35:00',
            process_id: 'hujv4HEgEfCNWg3rq0agKw'
        },
        { 
            flow: 'SHP → NS', 
            internal_id: '12554', 
            external_id: 'mhi-ns90-test-store.SHP.Deposit_7963945107602', 
            name: 'CD-12554', 
            customer_name: 'Marcus Rodriguez',
            amount: 2750.50,
            payment_method: 'Bank Transfer',
            payment_id: 'PAY-BT-2024-002',
            date: '2024-01-15 11:15:00', 
            stage: 'prepared', 
            status: 'success', 
            error_msg: '', 
            last_update: '2024-01-15 11:20:00',
            process_id: 'k2mN8FgHdEfCNWg3rq0agLx'
        },
        { 
            flow: 'SHP → NS', 
            internal_id: '12555', 
            external_id: 'mhi-ns90-test-store.SHP.Deposit_7963945107603', 
            name: 'CD-12555', 
            customer_name: 'Sarah Johnson',
            amount: 899.99,
            payment_method: 'PayPal',
            payment_id: 'PAY-PP-2024-003',
            date: '2024-01-15 12:00:00', 
            stage: 'landed', 
            status: 'ready', 
            error_msg: '', 
            last_update: '2024-01-15 12:05:00',
            process_id: 'p9qR5TgVdEfCNWg3rq0agMy'
        },
        { 
            flow: 'SHP → NS', 
            internal_id: '12556', 
            external_id: 'mhi-ns90-test-store.SHP.Deposit_7963945107604', 
            name: 'CD-12556', 
            customer_name: 'David Chen',
            amount: 2200.00,
            payment_method: 'Credit Card',
            payment_id: 'PAY-CC-2024-004',
            date: '2024-01-15 13:30:00', 
            stage: 'landed', 
            status: 'failed', 
            error_msg: 'Payment declined', 
            last_update: '2024-01-15 13:35:00',
            process_id: 'w3xZ7BgCdEfCNWg3rq0agNz'
        },
        { 
            flow: 'SHP → NS', 
            internal_id: '12557', 
            external_id: 'mhi-ns90-test-store.SHP.Deposit_7963945107605', 
            name: 'CD-12557', 
            customer_name: 'Lisa Thompson',
            amount: 1800.75,
            payment_method: 'Bank Transfer',
            payment_id: 'PAY-BT-2024-005',
            date: '2024-01-15 14:45:00', 
            stage: 'prepared', 
            status: 'failed', 
            error_msg: 'Insufficient funds', 
            last_update: '2024-01-15 14:50:00',
            process_id: 'a1bC4DgFdEfCNWg3rq0agOp'
        },
        { 
            flow: 'SHP → NS', 
            internal_id: '12558', 
            external_id: 'mhi-ns90-test-store.SHP.Deposit_7963945107606', 
            name: 'CD-12558', 
            customer_name: 'Michael Brown',
            amount: 3200.00,
            payment_method: 'Credit Card',
            payment_id: 'PAY-CC-2024-006',
            date: '2024-01-15 15:20:00', 
            stage: 'target', 
            status: 'success', 
            error_msg: '', 
            last_update: '2024-01-15 15:25:00',
            process_id: 'e5fG8HgIdEfCNWg3rq0agQr'
        },
        { 
            flow: 'SHP → NS', 
            internal_id: '12559', 
            external_id: 'mhi-ns90-test-store.SHP.Deposit_7963945107607', 
            name: 'CD-12559', 
            customer_name: 'Jennifer Davis',
            amount: 950.25,
            payment_method: 'PayPal',
            payment_id: 'PAY-PP-2024-007',
            date: '2024-01-15 16:10:00', 
            stage: 'landed', 
            status: 'ready', 
            error_msg: '', 
            last_update: '2024-01-15 16:15:00',
            process_id: 'i9jK2LgMdEfCNWg3rq0agSt'
        },
        { 
            flow: 'SHP → NS', 
            internal_id: '12560', 
            external_id: 'mhi-ns90-test-store.SHP.Deposit_7963945107608', 
            name: 'CD-12560', 
            customer_name: 'Robert Wilson',
            amount: 1650.80,
            payment_method: 'Bank Transfer',
            payment_id: 'PAY-BT-2024-008',
            date: '2024-01-15 17:00:00', 
            stage: 'prepared', 
            status: 'success', 
            error_msg: '', 
            last_update: '2024-01-15 17:05:00',
            process_id: 'u7vW0XgYdEfCNWg3rq0agUv'
        },
        { 
            flow: 'SHP → NS', 
            internal_id: '12561', 
            external_id: 'mhi-ns90-test-store.SHP.Deposit_7963945107609', 
            name: 'CD-12561', 
            customer_name: 'Amanda Foster',
            amount: 2800.00,
            payment_method: 'Credit Card',
            payment_id: 'PAY-CC-2024-009',
            date: '2024-01-15 18:30:00', 
            stage: 'target', 
            status: 'success', 
            error_msg: '', 
            last_update: '2024-01-15 18:35:00',
            process_id: 'x1yZ4AgBdEfCNWg3rq0agWx'
        },
        { 
            flow: 'SHP → NS', 
            internal_id: '12562', 
            external_id: 'mhi-ns90-test-store.SHP.Deposit_7963945107610', 
            name: 'CD-12562', 
            customer_name: 'Christopher Lee',
            amount: 1200.50,
            payment_method: 'PayPal',
            payment_id: 'PAY-PP-2024-010',
            date: '2024-01-15 19:15:00', 
            stage: 'landed', 
            status: 'ready', 
            error_msg: '', 
            last_update: '2024-01-15 19:20:00',
            process_id: 'z5aB7CgDdEfCNWg3rq0agYz'
        }
    ],
    order: [
        { 
            flow: 'SHP → NS', 
            internal_id: '12563', 
            external_id: 'mhi-ns90-test-store.SHP.Order_77787878', 
            name: 'SO-1234', 
            po_number: '#7874',
            subsidiary: 'US - West',
            customer_name: 'Evita Evans',
            amount: 1495.96,
            tax_total: 129.97,
            date: '2024-01-15 08:00:00', 
            stage: 'prepared', 
            status: 'success', 
            error_msg: '', 
            last_update: '2024-01-15 08:05:00',
            process_id: 'ord1hujv4HEgEfCNWg3rq0agKw'
        },
        { 
            flow: 'SHP → NS', 
            internal_id: '12564', 
            external_id: 'mhi-ns90-test-store.SHP.Order_77787879', 
            name: 'SO-1235', 
            po_number: '#9234',
            subsidiary: 'US - East',
            customer_name: 'Marcus Rodriguez',
            amount: 149.99,
            tax_total: 15.00,
            date: '2024-01-15 08:30:00', 
            stage: 'target', 
            status: 'ready', 
            error_msg: '', 
            last_update: '2024-01-15 08:35:00',
            process_id: 'ord2k2mN8FgHdEfCNWg3rq0agLx'
        },
        { 
            flow: 'SHP → NS', 
            internal_id: '12565', 
            external_id: 'mhi-ns90-test-store.SHP.Order_77787880', 
            name: 'SO-1236', 
            po_number: '#4567',
            subsidiary: 'Headquarter',
            customer_name: 'Sarah Johnson',
            amount: 599.99,
            tax_total: 60.00,
            date: '2024-01-15 09:00:00', 
            stage: 'landed', 
            status: 'failed', 
            error_msg: 'Customer not found', 
            last_update: '2024-01-15 09:05:00',
            process_id: 'ord3p9qR5TgVdEfCNWg3rq0agMy'
        },
        { 
            flow: 'SHP → NS', 
            internal_id: '12573', 
            external_id: 'mhi-ns90-test-store.SHP.Order_77787883', 
            name: 'SO-1237', 
            po_number: '#1234',
            subsidiary: 'US - West',
            customer_name: 'Jennifer Davis',
            amount: 899.99,
            tax_total: 90.00,
            date: '2024-01-15 09:30:00', 
            stage: 'prepared', 
            status: 'success', 
            error_msg: '', 
            last_update: '2024-01-15 09:35:00',
            process_id: 'ord4i9jK2LgMdEfCNWg3rq0agSt'
        },
        { 
            flow: 'SHP → NS', 
            internal_id: '12574', 
            external_id: 'mhi-ns90-test-store.SHP.Order_77787884', 
            name: 'SO-1238', 
            po_number: '#5678',
            subsidiary: 'US - East',
            customer_name: 'Robert Wilson',
            amount: 1299.99,
            tax_total: 130.00,
            date: '2024-01-15 10:00:00', 
            stage: 'target', 
            status: 'ready', 
            error_msg: '', 
            last_update: '2024-01-15 10:05:00',
            process_id: 'ord5u7vW0XgYdEfCNWg3rq0agUv'
        },
        { 
            flow: 'SHP → NS', 
            internal_id: '12575', 
            external_id: 'mhi-ns90-test-store.SHP.Order_77787885', 
            name: 'SO-1239', 
            po_number: '#9012',
            subsidiary: 'Headquarter',
            customer_name: 'Amanda Foster',
            amount: 450.50,
            tax_total: 45.05,
            date: '2024-01-15 10:30:00', 
            stage: 'landed', 
            status: 'success', 
            error_msg: '', 
            last_update: '2024-01-15 10:35:00',
            process_id: 'ord6x1yZ4AgBdEfCNWg3rq0agWx'
        },
        { 
            flow: 'SHP → NS', 
            internal_id: '12576', 
            external_id: 'mhi-ns90-test-store.SHP.Order_77787886', 
            name: 'SO-1240', 
            po_number: '#3456',
            subsidiary: 'US - West',
            customer_name: 'Christopher Lee',
            amount: 750.25,
            tax_total: 75.03,
            date: '2024-01-15 11:00:00', 
            stage: 'prepared', 
            status: 'failed', 
            error_msg: 'Payment declined', 
            last_update: '2024-01-15 11:05:00',
            process_id: 'ord7z5aB7CgDdEfCNWg3rq0agYz'
        }
    ],
    fulfillment: [
        { 
            flow: 'SHP → NS', 
            internal_id: '12566', 
            external_id: '77787881', 
            name: 'IF-12566', 
            tracking_number: '1111112121',
            tracking_company: 'FedEx',
            date: '2024-01-15 09:00:00', 
            stage: 'prepared', 
            status: 'Picked', 
            error_msg: '', 
            last_update: '2024-01-15 09:05:00',
            process_id: 'ful1hujv4HEgEfCNWg3rq0agKw'
        },
        { 
            flow: 'SHP → NS', 
            internal_id: '12568', 
            external_id: '77787882', 
            name: 'IF-12568', 
            tracking_number: '2222223232',
            tracking_company: 'UPS',
            date: '2024-01-15 10:00:00', 
            stage: 'prepared', 
            status: 'Packed', 
            error_msg: '', 
            last_update: '2024-01-15 10:05:00',
            process_id: 'ful2hujv4HEgEfCNWg3rq0agKw'
        },
        { 
            flow: 'SHP → NS', 
            internal_id: '12570', 
            external_id: '77787883', 
            name: 'IF-12570', 
            tracking_number: '3333334343',
            tracking_company: 'DHL',
            date: '2024-01-15 11:00:00', 
            stage: 'prepared', 
            status: 'Shipped', 
            error_msg: '', 
            last_update: '2024-01-15 11:05:00',
            process_id: 'ful3hujv4HEgEfCNWg3rq0agKw'
        }
    ],
    refund: [
        { 
            flow: 'SHP → NS', 
            internal_id: '12568', 
            external_id: 'mhi-ns90-test-store.SHP.Refund_7963945107801', 
            name: 'RF-7890', 
            customer_name: 'Evita Evans',
            refund_amount: 150.00,
            original_order: 'SO-1234',
            date: '2024-01-15 06:00:00', 
            stage: 'prepared', 
            status: 'success', 
            error_msg: '', 
            last_update: '2024-01-15 06:05:00',
            process_id: 'ref1hujv4HEgEfCNWg3rq0agKw'
        },
        { 
            flow: 'SHP → NS', 
            internal_id: '12569', 
            external_id: 'mhi-ns90-test-store.SHP.Refund_7963945107802', 
            name: 'RF-7891', 
            customer_name: 'Marcus Rodriguez',
            refund_amount: 75.50,
            original_order: 'SO-1235',
            date: '2024-01-15 06:30:00', 
            stage: 'target', 
            status: 'ready', 
            error_msg: '', 
            last_update: '2024-01-15 06:35:00',
            process_id: 'ref2k2mN8FgHdEfCNWg3rq0agLx'
        }
    ],
    products: [
        { 
            flow: 'NS → SHP', 
            internal_id: '12570', 
            external_id: 'mhi-ns90-test-store.NS.Product_7963945107901', 
            name: 'Laptop Pro', 
            matrix_type: 'PARENT',
            date: '2024-01-15 05:00:00', 
            stage: 'prepared', 
            status: 'success', 
            error_msg: '', 
            last_update: '2024-01-15 05:05:00',
            process_id: 'prod1hujv4HEgEfCNWg3rq0agKw'
        },
        { 
            flow: 'NS → SHP', 
            internal_id: '12571', 
            external_id: 'mhi-ns90-test-store.NS.Product_7963945107902', 
            name: 'Wireless Mouse', 
            matrix_type: 'NULL',
            date: '2024-01-15 05:30:00', 
            stage: 'target', 
            status: 'ready', 
            error_msg: '', 
            last_update: '2024-01-15 05:35:00',
            process_id: 'prod2k2mN8FgHdEfCNWg3rq0agLx'
        },
        { 
            flow: 'NS → SHP', 
            internal_id: '12572', 
            external_id: 'mhi-ns90-test-store.NS.Product_7963945107903', 
            name: 'Gaming Keyboard', 
            matrix_type: 'PARENT',
            date: '2024-01-15 06:00:00', 
            stage: 'landed', 
            status: 'failed', 
            error_msg: 'Invalid SKU', 
            last_update: '2024-01-15 06:05:00',
            process_id: 'prod3p9qR5TgVdEfCNWg3rq0agMy'
        }
    ]
};

// Sample line items data
const sampleLineItems = {
    'mhi-ns90-test-store.SHP.Order_77787878': [
        { 
            internal_id: '12563', 
            external_id: 'mhi-ns90-test-store.SHP.Order_77787878',
            item_id: 'LAPTOP001', 
            name: 'Laptop Pro 15"', 
            sku: 'LAPTOP-PRO-15-2024',
            price_level: 'Standard',
            price: 1299.99,
            quantity: 1, 
            amount: 1299.99, 
            tax_code: 'CA_TAX', 
            tax_amount: 129.99,
            shp_line_id: '15769064898647'
        },
        { 
            internal_id: '12563', 
            external_id: 'mhi-ns90-test-store.SHP.Order_77787878',
            item_id: 'MOUSE001', 
            name: 'Wireless Mouse', 
            sku: 'MOUSE-WIRELESS-001',
            price_level: 'Custom',
            price: 29.99,
            quantity: 2, 
            amount: 59.98, 
            tax_code: 'CA_TAX', 
            tax_amount: 5.99,
            shp_line_id: '15769064898648'
        }
    ],
    'mhi-ns90-test-store.SHP.Order_77787879': [
        { 
            internal_id: '12564', 
            external_id: 'mhi-ns90-test-store.SHP.Order_77787879',
            item_id: 'KEYBOARD001', 
            name: 'Gaming Keyboard', 
            sku: 'KEYBOARD-GAMING-001',
            price_level: 'Standard',
            price: 149.99,
            quantity: 1, 
            amount: 149.99, 
            tax_code: 'NY_TAX', 
            tax_amount: 15.00,
            shp_line_id: '15769064898649'
        }
    ],
    'mhi-ns90-test-store.SHP.Order_77787880': [
        { 
            internal_id: '12565', 
            external_id: 'mhi-ns90-test-store.SHP.Order_77787880',
            item_id: 'MONITOR001', 
            name: '4K Monitor', 
            sku: 'MONITOR-4K-001',
            price_level: 'Standard',
            price: 599.99,
            quantity: 1, 
            amount: 599.99, 
            tax_code: 'TX_TAX', 
            tax_amount: 60.00,
            shp_line_id: '15769064898650'
        }
    ],
    'mhi-ns90-test-store.SHP.Order_77787883': [
        { 
            internal_id: '12573', 
            external_id: 'mhi-ns90-test-store.SHP.Order_77787883',
            item_id: 'HEADPHONES001', 
            name: 'Wireless Headphones', 
            sku: 'HEADPHONES-WIRELESS-001',
            price_level: 'Standard',
            price: 899.99,
            quantity: 1, 
            amount: 899.99, 
            tax_code: 'CA_TAX', 
            tax_amount: 90.00,
            shp_line_id: '15769064898651'
        }
    ],
    'mhi-ns90-test-store.SHP.Order_77787884': [
        { 
            internal_id: '12574', 
            external_id: 'mhi-ns90-test-store.SHP.Order_77787884',
            item_id: 'TABLET001', 
            name: 'iPad Pro 12"', 
            sku: 'TABLET-IPAD-PRO-12',
            price_level: 'Custom',
            price: 1299.99,
            quantity: 1, 
            amount: 1299.99, 
            tax_code: 'NY_TAX', 
            tax_amount: 130.00,
            shp_line_id: '15769064898652'
        }
    ],
    'mhi-ns90-test-store.SHP.Order_77787885': [
        { 
            internal_id: '12575', 
            external_id: 'mhi-ns90-test-store.SHP.Order_77787885',
            item_id: 'WATCH001', 
            name: 'Smart Watch', 
            sku: 'WATCH-SMART-001',
            price_level: 'Standard',
            price: 450.50,
            quantity: 1, 
            amount: 450.50, 
            tax_code: 'FL_TAX', 
            tax_amount: 45.05,
            shp_line_id: '15769064898653'
        }
    ],
    'mhi-ns90-test-store.SHP.Order_77787886': [
        { 
            internal_id: '12576', 
            external_id: 'mhi-ns90-test-store.SHP.Order_77787886',
            item_id: 'CAMERA001', 
            name: 'Digital Camera', 
            sku: 'CAMERA-DIGITAL-001',
            price_level: 'Standard',
            price: 750.25,
            quantity: 1, 
            amount: 750.25, 
            tax_code: 'WA_TAX', 
            tax_amount: 75.03,
            shp_line_id: '15769064898654'
        }
    ],
    '77787881': [
        { 
            internal_id: '12566', 
            external_id: '77787881',
            item_id: 'LAPTOP001', 
            name: 'Laptop Pro 15"', 
            sku: 'LAPTOP-PRO-15-2024',
            quantity: 1, 
            amount: 1299.99,
            location: 'Warehouse A'
        },
        { 
            internal_id: '12567', 
            external_id: '77787881',
            item_id: 'MOUSE001', 
            name: 'Wireless Mouse', 
            sku: 'MOUSE-WIRELESS-001',
            quantity: 2, 
            amount: 49.99,
            location: 'Warehouse B'
        },
        { 
            internal_id: '12568', 
            external_id: '77787881',
            item_id: 'KEYBOARD001', 
            name: 'Gaming Keyboard', 
            sku: 'KEYBOARD-GAMING-001',
            quantity: 1, 
            amount: 149.99,
            location: 'Warehouse C'
        }
    ],
    '77787882': [
        { 
            internal_id: '12569', 
            external_id: '77787882',
            item_id: 'MOUSE001', 
            name: 'Wireless Mouse', 
            sku: 'MOUSE-WIRELESS-001',
            quantity: 3, 
            amount: 49.99,
            location: 'Warehouse B'
        },
        { 
            internal_id: '12570', 
            external_id: '77787882',
            item_id: 'HEADPHONES001', 
            name: 'Bluetooth Headphones', 
            sku: 'HEADPHONES-BT-001',
            quantity: 1, 
            amount: 199.99,
            location: 'Warehouse A'
        }
    ],
    '77787883': [
        { 
            internal_id: '12571', 
            external_id: '77787883',
            item_id: 'KEYBOARD001', 
            name: 'Gaming Keyboard', 
            sku: 'KEYBOARD-GAMING-001',
            quantity: 2, 
            amount: 149.99,
            location: 'Warehouse C'
        },
        { 
            internal_id: '12572', 
            external_id: '77787883',
            item_id: 'MONITOR001', 
            name: '27" Gaming Monitor', 
            sku: 'MONITOR-GAMING-27',
            quantity: 1, 
            amount: 399.99,
            location: 'Warehouse A'
        },
        { 
            internal_id: '12573', 
            external_id: '77787883',
            item_id: 'WEBCAM001', 
            name: 'HD Webcam', 
            sku: 'WEBCAM-HD-001',
            quantity: 1, 
            amount: 89.99,
            location: 'Warehouse B'
        }
    ]
};

// Sample associated records data
const sampleAssociatedRecords = {
    'mhi-ns90-test-store.SHP.Order_77787878': [
        { type: 'Customer Deposit', internal_id: '12545', external_id: 'CD-4545', date: '2024-01-15 10:30:00', name: 'CD-4545', amount: 299.99, applied_on: 'mhi-ns90-test-store.SHP.Deposit_7963945107601', status: 'Deposited' },
        { type: 'Fulfillment', internal_id: '12553', external_id: 'IF-7874', date: '2024-01-15 07:00:00', name: 'IF-7874', amount: null, applied_on: 'N/A', status: 'Picked' },
        { type: 'Invoice', internal_id: '12563', external_id: 'INV-4547', date: '2024-01-15 08:10:00', name: 'INV-4547', amount: 299.99, applied_on: 'N/A', status: 'Open' },
        { type: 'Customer Refund', internal_id: '12572', external_id: 'CR-001', date: '2024-01-15 06:05:00', name: 'CR-001', amount: 150.00, applied_on: 'mhi-ns90-test-store.SHP.Deposit_7963945107601', status: 'Success' }
    ],
    'mhi-ns90-test-store.SHP.Order_77787879': [
        { type: 'Customer Deposit', internal_id: '12566', external_id: 'CD-4546', date: '2024-01-15 11:15:00', name: 'CD-4546', amount: 199.99, applied_on: 'mhi-ns90-test-store.SHP.Deposit_7963945107602', status: 'Fully Applied' },
        { type: 'Invoice', internal_id: '12568', external_id: 'INV-4548', date: '2024-01-15 08:40:00', name: 'INV-4548', amount: 199.99, applied_on: 'N/A', status: 'Paid In Full' },
        { type: 'Customer Refund', internal_id: '12573', external_id: 'CR-002', date: '2024-01-15 06:35:00', name: 'CR-002', amount: 75.50, applied_on: 'mhi-ns90-test-store.SHP.Deposit_7963945107602', status: 'Ready' }
    ],
    '77787881': [
        { type: 'Order', internal_id: '12570', external_id: 'SO-1234', date: '2024-01-15 08:00:00', name: 'SO-1234', amount: 299.99, applied_on: 'N/A', status: 'Success' },
        { type: 'Invoice', internal_id: '12563', external_id: 'INV-4547', date: '2024-01-15 08:10:00', name: 'INV-4547', amount: 299.99, applied_on: 'N/A', status: 'Open' }
    ],
    '77787882': [
        { type: 'Order', internal_id: '12571', external_id: 'SO-1235', date: '2024-01-15 08:30:00', name: 'SO-1235', amount: 199.99, applied_on: 'N/A', status: 'Ready' }
    ],
    'mhi-ns90-test-store.SHP.Order_77787883': [
        { type: 'Customer Deposit', internal_id: '12577', external_id: 'CD-4547', date: '2024-01-15 12:15:00', name: 'CD-4547', amount: 899.99, applied_on: 'mhi-ns90-test-store.SHP.Deposit_7963945107603', status: 'Deposited' },
        { type: 'Invoice', internal_id: '12578', external_id: 'INV-4549', date: '2024-01-15 09:40:00', name: 'INV-4549', amount: 899.99, applied_on: 'N/A', status: 'Open' },
        { type: 'Customer Refund', internal_id: '12579', external_id: 'CR-003', date: '2024-01-15 07:05:00', name: 'CR-003', amount: 100.00, applied_on: 'mhi-ns90-test-store.SHP.Deposit_7963945107603', status: 'Success' }
    ],
    'mhi-ns90-test-store.SHP.Order_77787884': [
        { type: 'Customer Deposit', internal_id: '12580', external_id: 'CD-4548', date: '2024-01-15 13:00:00', name: 'CD-4548', amount: 1299.99, applied_on: 'mhi-ns90-test-store.SHP.Deposit_7963945107604', status: 'Fully Applied' },
        { type: 'Fulfillment', internal_id: '12581', external_id: 'IF-7875', date: '2024-01-15 10:10:00', name: 'IF-7875', amount: null, applied_on: 'N/A', status: 'Packed' }
    ],
    'mhi-ns90-test-store.SHP.Order_77787885': [
        { type: 'Customer Deposit', internal_id: '12582', external_id: 'CD-4549', date: '2024-01-15 13:30:00', name: 'CD-4549', amount: 450.50, applied_on: 'mhi-ns90-test-store.SHP.Deposit_7963945107605', status: 'Deposited' },
        { type: 'Invoice', internal_id: '12583', external_id: 'INV-4550', date: '2024-01-15 10:40:00', name: 'INV-4550', amount: 450.50, applied_on: 'N/A', status: 'Paid In Full' }
    ],
    'mhi-ns90-test-store.SHP.Order_77787886': [
        { type: 'Customer Deposit', internal_id: '12584', external_id: 'CD-4550', date: '2024-01-15 14:00:00', name: 'CD-4550', amount: 750.25, applied_on: 'mhi-ns90-test-store.SHP.Deposit_7963945107606', status: 'Not Deposited' },
        { type: 'Customer Refund', internal_id: '12585', external_id: 'CR-004', date: '2024-01-15 07:35:00', name: 'CR-004', amount: 200.00, applied_on: 'mhi-ns90-test-store.SHP.Deposit_7963945107606', status: 'Ready' }
    ],
    'mhi-ns90-test-store.SHP.Refund_7963945107801': [
        { type: 'Customer Refund', internal_id: '12572', external_id: 'CR-001', date: '2024-01-15 06:05:00', name: 'CR-001', amount: 299.99, status: 'Success' },
        { type: 'Original Order', internal_id: '12570', external_id: 'SO-1234', date: '2024-01-15 08:00:00', name: 'SO-1234', amount: 299.99, status: 'Success' },
        { type: 'Customer Deposit', internal_id: '12545', external_id: 'CD-4545', date: '2024-01-15 10:30:00', name: 'CD-4545', amount: 299.99, status: 'Deposited' }
    ],
    'mhi-ns90-test-store.SHP.Refund_7963945107802': [
        { type: 'Customer Refund', internal_id: '12573', external_id: 'CR-002', date: '2024-01-15 06:35:00', name: 'CR-002', amount: 199.99, status: 'Ready' },
        { type: 'Original Order', internal_id: '12571', external_id: 'SO-1235', date: '2024-01-15 08:30:00', name: 'SO-1235', amount: 199.99, status: 'Ready' },
        { type: 'Customer Deposit', internal_id: '12566', external_id: 'CD-4546', date: '2024-01-15 11:15:00', name: 'CD-4546', amount: 199.99, status: 'Fully Applied' }
    ]
};

// Sample child items for matrix products
const sampleChildItems = {
    'mhi-ns90-test-store.NS.Product_7963945107901': [
        { item_id: 'LAPTOP001_BLK', name: 'Laptop Pro 15" - Black', quantity: 10, amount: 1299.99, tax_location: 'N/A', total: 12999.90 },
        { item_id: 'LAPTOP001_SLV', name: 'Laptop Pro 15" - Silver', quantity: 8, amount: 1299.99, tax_location: 'N/A', total: 10399.92 }
    ],
    'mhi-ns90-test-store.NS.Product_7963945107903': [
        { item_id: 'KEYBOARD001_RGB', name: 'Gaming Keyboard - RGB', quantity: 15, amount: 149.99, tax_location: 'N/A', total: 2249.85 },
        { item_id: 'KEYBOARD001_BLK', name: 'Gaming Keyboard - Black', quantity: 12, amount: 149.99, tax_location: 'N/A', total: 1799.88 }
    ]
};

// Chart data
const chartData = {
    totalRecords: [10, 9, 11, 6, 16, 4, 251, 28, 51, 18, 62],
    failedRecords: [0, 0, 0, 0, 0, 0, 45, 8, 2, 8, 5],
    dates: ['22 Jul 2025', '23 Jul 2025', '24 Jul 2025', '25 Jul 2025', '26 Jul 2025', '27 Jul 2025', '28 Jul 2025', '29 Jul 2025', '30 Jul 2025', '31 Jul 2025', '1 Aug 2025']
};

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Initialize the customer tab headers first
        switchTab('customer');
        loadData();
        setupEventListeners();
        initializeCharts();
        updateSummaryBoxes();

        // Add event listener for add-filter-btn
        const addFilterBtn = document.querySelector('.add-filter-btn');
        if (addFilterBtn) {
            addFilterBtn.addEventListener('click', addNewFilter);
        }

        // Update existing remove filter functionality
        const existingRemoveBtn = document.querySelector('.remove-filter-btn');
        if (existingRemoveBtn) {
            existingRemoveBtn.addEventListener('click', function() {
                const filterInfo = this.closest('.filter-info');
                if (filterInfo) {
                    filterInfo.remove();
                    applyDynamicFilters();
                }
            });
        }
    } catch (error) {
        console.error('Error initializing dashboard:', error);
        hideLoading(); // Ensure loading is hidden even if there's an error
    }
});

// Initialize Dashboard
function initializeDashboard() {
    // Set default dates
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
    
    document.getElementById('dateFrom').value = thirtyDaysAgo.toISOString().split('T')[0];
    document.getElementById('dateTo').value = today.toISOString().split('T')[0];
    
    // Initialize line items data
    // lineItemsData = sampleLineItems; // This line is removed as per new_code
}

// Setup Event Listeners
function setupEventListeners() {
    // Tab switching
    document.querySelectorAll('.main-tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchTab(this.dataset.tab);
        });
    });

    // Search functionality
    document.getElementById('searchInput').addEventListener('input', function() {
        applyFilters();
    });

    // Date and status filters
    document.getElementById('dateFrom').addEventListener('change', applyFilters);
    document.getElementById('dateTo').addEventListener('change', applyFilters);
    document.getElementById('statusFilter').addEventListener('change', applyFilters);
    document.getElementById('stageFilter').addEventListener('change', applyFilters);

    // Remove filter button
    document.querySelector('.remove-filter-btn').addEventListener('click', function() {
        document.querySelector('.filter-value').textContent = 'All Time';
        applyFilters();
    });
}

// Switch Tab
function switchTab(tabName) {
    // Update active tab
    document.querySelectorAll('.main-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    // Update current tab
    currentTab = tabName;
    
    // Update table header based on tab
    const emailCustomerHeader = document.getElementById('emailCustomerHeader');
    const customerHeader = document.getElementById('customerHeader');
    const amountHeader = document.getElementById('amountHeader');
    const taxTotalHeader = document.getElementById('taxTotalHeader');
    const paymentMethodHeader = document.getElementById('paymentMethodHeader');
    const paymentIdHeader = document.getElementById('paymentIdHeader');
    const matrixTypeHeader = document.getElementById('matrixTypeHeader');
    const poNumberHeader = document.getElementById('poNumberHeader');
    const subsidiaryHeader = document.getElementById('subsidiaryHeader');
    const trackingNumberHeader = document.getElementById('trackingNumberHeader');
    const trackingCompanyHeader = document.getElementById('trackingCompanyHeader');
    const statusHeader = document.querySelector('.summary-table th:nth-child(16)'); // Status column (adjusted for new columns)
    
    if (emailCustomerHeader) {
        if (tabName === 'deposit') {
            emailCustomerHeader.textContent = 'Customer Name';
            // Show deposit-specific columns
            if (customerHeader) customerHeader.style.display = 'none';
            if (amountHeader) amountHeader.style.display = 'table-cell';
            if (taxTotalHeader) taxTotalHeader.style.display = 'none';
            if (paymentMethodHeader) paymentMethodHeader.style.display = 'table-cell';
            if (paymentIdHeader) paymentIdHeader.style.display = 'table-cell';
            if (matrixTypeHeader) matrixTypeHeader.style.display = 'none';
            if (poNumberHeader) poNumberHeader.style.display = 'none';
            if (subsidiaryHeader) subsidiaryHeader.style.display = 'none';
            if (trackingNumberHeader) trackingNumberHeader.style.display = 'none';
            if (trackingCompanyHeader) trackingCompanyHeader.style.display = 'none';
            if (statusHeader) statusHeader.style.display = 'table-cell';
        } else if (tabName === 'order') {
            emailCustomerHeader.style.display = 'none';
            // Show order-specific columns
            if (customerHeader) customerHeader.style.display = 'table-cell';
            if (amountHeader) amountHeader.style.display = 'table-cell';
            if (taxTotalHeader) taxTotalHeader.style.display = 'table-cell';
            if (paymentMethodHeader) paymentMethodHeader.style.display = 'none';
            if (paymentIdHeader) paymentIdHeader.style.display = 'none';
            if (matrixTypeHeader) matrixTypeHeader.style.display = 'none';
            if (poNumberHeader) poNumberHeader.style.display = 'table-cell';
            if (subsidiaryHeader) subsidiaryHeader.style.display = 'table-cell';
            if (trackingNumberHeader) trackingNumberHeader.style.display = 'none';
            if (trackingCompanyHeader) trackingCompanyHeader.style.display = 'none';
            if (statusHeader) statusHeader.style.display = 'table-cell';
        } else if (tabName === 'fulfillment') {
            emailCustomerHeader.style.display = 'none';
            // Show fulfillment-specific columns
            if (customerHeader) customerHeader.style.display = 'none';
            if (amountHeader) amountHeader.style.display = 'none';
            if (taxTotalHeader) taxTotalHeader.style.display = 'none';
            if (paymentMethodHeader) paymentMethodHeader.style.display = 'none';
            if (paymentIdHeader) paymentIdHeader.style.display = 'none';
            if (matrixTypeHeader) matrixTypeHeader.style.display = 'none';
            if (poNumberHeader) poNumberHeader.style.display = 'none';
            if (subsidiaryHeader) subsidiaryHeader.style.display = 'none';
            if (trackingNumberHeader) trackingNumberHeader.style.display = 'table-cell';
            if (trackingCompanyHeader) trackingCompanyHeader.style.display = 'table-cell';
            if (statusHeader) statusHeader.style.display = 'table-cell';
        } else if (tabName === 'products') {
            emailCustomerHeader.textContent = 'Email';
            emailCustomerHeader.style.display = 'table-cell';
            // Show product-specific columns
            if (customerHeader) customerHeader.style.display = 'none';
            if (amountHeader) amountHeader.style.display = 'none';
            if (taxTotalHeader) taxTotalHeader.style.display = 'none';
            if (paymentMethodHeader) paymentMethodHeader.style.display = 'none';
            if (paymentIdHeader) paymentIdHeader.style.display = 'none';
            if (matrixTypeHeader) matrixTypeHeader.style.display = 'table-cell';
            if (poNumberHeader) poNumberHeader.style.display = 'none';
            if (subsidiaryHeader) subsidiaryHeader.style.display = 'none';
            if (trackingNumberHeader) trackingNumberHeader.style.display = 'none';
            if (trackingCompanyHeader) trackingCompanyHeader.style.display = 'none';
            if (statusHeader) statusHeader.style.display = 'table-cell';
        } else if (tabName === 'customer') {
            emailCustomerHeader.textContent = 'Email';
            emailCustomerHeader.style.display = 'table-cell';
            // Hide all specific columns and Status column for customer tab
            if (customerHeader) customerHeader.style.display = 'none';
            if (amountHeader) amountHeader.style.display = 'none';
            if (taxTotalHeader) taxTotalHeader.style.display = 'none';
            if (paymentMethodHeader) paymentMethodHeader.style.display = 'none';
            if (paymentIdHeader) paymentIdHeader.style.display = 'none';
            if (matrixTypeHeader) matrixTypeHeader.style.display = 'none';
            if (poNumberHeader) poNumberHeader.style.display = 'none';
            if (subsidiaryHeader) subsidiaryHeader.style.display = 'none';
            if (trackingNumberHeader) trackingNumberHeader.style.display = 'none';
            if (trackingCompanyHeader) trackingCompanyHeader.style.display = 'none';
            if (statusHeader) statusHeader.style.display = 'none';
        } else {
            emailCustomerHeader.textContent = 'Email';
            emailCustomerHeader.style.display = 'table-cell';
            // Hide all specific columns
            if (customerHeader) customerHeader.style.display = 'none';
            if (amountHeader) amountHeader.style.display = 'none';
            if (taxTotalHeader) taxTotalHeader.style.display = 'none';
            if (paymentMethodHeader) paymentMethodHeader.style.display = 'none';
            if (paymentIdHeader) paymentIdHeader.style.display = 'none';
            if (matrixTypeHeader) matrixTypeHeader.style.display = 'none';
            if (poNumberHeader) poNumberHeader.style.display = 'none';
            if (subsidiaryHeader) subsidiaryHeader.style.display = 'none';
            if (trackingNumberHeader) trackingNumberHeader.style.display = 'none';
            if (trackingCompanyHeader) trackingCompanyHeader.style.display = 'none';
            if (statusHeader) statusHeader.style.display = 'table-cell';
        }
    }
    
    // Clear line items
    closeLineItems();
    
    // Load data for new tab
    loadData();
}

// Toggle Charts
function toggleCharts() {
    const chartsContent = document.getElementById('chartsContent');
    const toggleBtn = document.getElementById('toggleChartsBtn');
    const icon = toggleBtn.querySelector('i');
    
    chartsCollapsed = !chartsCollapsed;
    
    if (chartsCollapsed) {
        chartsContent.classList.add('collapsed');
        icon.className = 'fas fa-plus';
    } else {
        chartsContent.classList.remove('collapsed');
        icon.className = 'fas fa-minus';
    }
}

// Load Data
function loadData() {
    showLoading();
    
    // Use a shorter timeout and ensure hideLoading is always called
    setTimeout(() => {
        try {
            filteredData = [...sampleData[currentTab]];
            populateSummaryTable();
            updateSummaryBoxes();
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            hideLoading(); // Always hide loading regardless of success/failure
        }
    }, 300); // Reduced from 500ms to 300ms
}

// Initialize Charts
function initializeCharts() {
    try {
        // Total Records Chart
        const totalCtx = document.getElementById('totalRecordsChart');
        if (totalCtx) {
            totalRecordsChart = new Chart(totalCtx.getContext('2d'), {
                type: 'line',
                data: {
                    labels: ['Jan 10', 'Jan 11', 'Jan 12', 'Jan 13', 'Jan 14', 'Jan 15'],
                    datasets: [{
                        label: 'Total Records',
                        data: [120, 135, 142, 138, 156, 147],
                        borderColor: '#007bff',
                        backgroundColor: 'rgba(0, 123, 255, 0.1)',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        // Failed Records Chart
        const failedCtx = document.getElementById('failedRecordsChart');
        if (failedCtx) {
            failedRecordsChart = new Chart(failedCtx.getContext('2d'), {
                type: 'line',
                data: {
                    labels: ['Jan 10', 'Jan 11', 'Jan 12', 'Jan 13', 'Jan 14', 'Jan 15'],
                    datasets: [{
                        label: 'Failed Records',
                        data: [5, 3, 7, 4, 2, 6],
                        borderColor: '#dc3545',
                        backgroundColor: 'rgba(220, 53, 69, 0.1)',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    } catch (error) {
        console.error('Error initializing charts:', error);
    }
}

// Function to get order status based on record
function getOrderStatus(record) {
    const statuses = ['Pending Fulfillment', 'Billed', 'Closed', 'Pending Billing'];
    // Use a simple hash of the record ID to get consistent status
    const hash = record.internal_id.toString().split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    return statuses[hash % statuses.length];
}

// Populate Summary Table
function populateSummaryTable() {
    const tbody = document.getElementById('summaryTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';

    filteredData.forEach(record => {
        const row = document.createElement('tr');
        
        // Create email cell - show email for customers, empty for others
        const emailCell = currentTab === 'customer' ? record.email || '' : '';
        
        // Create process ID cell - show process ID for customers, deposits, orders, and fulfillment
        const processIdCell = (currentTab === 'customer' || currentTab === 'deposit' || currentTab === 'order' || currentTab === 'fulfillment') ? record.process_id || '' : '';
        
        // For deposits, show additional columns
        if (currentTab === 'deposit') {
            // Determine deposit status values
            let depositStatus = '';
            let integrationStatus = '';
            
            if (record.status === 'success') {
                depositStatus = 'Deposited';
                integrationStatus = 'Success';
            } else if (record.status === 'failed') {
                depositStatus = 'Not Deposited';
                integrationStatus = 'Failed';
            } else if (record.status === 'ready') {
                depositStatus = 'Fully Applied';
                integrationStatus = 'Ready';
            } else {
                depositStatus = 'Not Deposited';
                integrationStatus = record.status;
            }
            
            row.innerHTML = `
                <td class="flow-cell">${record.flow}</td>
                <td>${record.internal_id}</td>
                <td>${record.external_id}</td>
                <td>${record.name}</td>
                <td>${record.customer_name || ''}</td>
                <td>$${record.amount?.toFixed(2) || '0.00'}</td>
                <td>${record.payment_method || 'N/A'}</td>
                <td>${record.payment_id || 'N/A'}</td>
                <td class="status-cell"><span class="status-badge status-${depositStatus.toLowerCase().replace(' ', '-')}">${depositStatus}</span></td>
                <td>${formatDateTime(record.date)}</td>
                <td><span class="stage-badge stage-${record.stage}">${record.stage}</span></td>
                <td class="status-cell"><span class="status-badge status-${integrationStatus.toLowerCase()}">${integrationStatus}</span></td>
                <td>${processIdCell}</td>
            `;
        } else if (currentTab === 'order') {
            // For orders, show customer, amount, tax_total, PO#, and SUBSIDIARY columns
            row.innerHTML = `
                <td class="flow-cell">${record.flow}</td>
                <td>${record.internal_id}</td>
                <td>${record.external_id}</td>
                <td>${record.name}</td>
                <td>${record.po_number || 'N/A'}</td>
                <td>${record.subsidiary || 'N/A'}</td>
                <td>${record.customer_name || ''}</td>
                <td>$${record.amount?.toFixed(2) || '0.00'}</td>
                <td>$${record.tax_total?.toFixed(2) || '0.00'}</td>
                <td>${getOrderStatus(record)}</td>
                <td>${formatDateTime(record.date)}</td>
                <td><span class="stage-badge stage-${record.stage}">${record.stage}</span></td>
                <td class="status-cell"><span class="status-badge status-${record.status}">${record.status}</span></td>
                <td>${processIdCell}</td>
            `;
        } else if (currentTab === 'fulfillment') {
            // For fulfillment, show tracking number and tracking company columns
            // Determine integration status for fulfillment
            let integrationStatus = '';
            if (record.status === 'Picked' || record.status === 'Packed' || record.status === 'Shipped') {
                integrationStatus = 'Success';
            } else if (record.stage === 'target') {
                integrationStatus = 'Ready';
            } else if (record.stage === 'landed') {
                integrationStatus = 'Failed';
            } else {
                integrationStatus = 'Ready';
            }
            
            row.innerHTML = `
                <td class="flow-cell">${record.flow}</td>
                <td>${record.internal_id}</td>
                <td>${record.external_id}</td>
                <td>${record.name}</td>
                <td>${record.tracking_number || 'N/A'}</td>
                <td>${record.tracking_company || 'N/A'}</td>
                <td>${record.status}</td>
                <td>${formatDateTime(record.date)}</td>
                <td><span class="stage-badge stage-${record.stage}">${record.stage}</span></td>
                <td class="status-cell"><span class="status-badge status-${integrationStatus.toLowerCase()}">${integrationStatus}</span></td>
                <td>${processIdCell}</td>
            `;
        } else if (currentTab === 'products') {
            // For products, show matrix type column
            row.innerHTML = `
                <td class="flow-cell">${record.flow}</td>
                <td>${record.internal_id}</td>
                <td>${record.external_id}</td>
                <td>${record.name}</td>
                <td>${emailCell}</td>
                <td>${record.matrix_type || 'N/A'}</td>
                <td></td>
                <td>${formatDateTime(record.date)}</td>
                <td><span class="stage-badge stage-${record.stage}">${record.stage}</span></td>
                <td class="status-cell"><span class="status-badge status-${record.status}">${record.status}</span></td>
                <td>${processIdCell}</td>
            `;
        } else if (currentTab === 'customer') {
            // For customer tab, remove Status column
            row.innerHTML = `
                <td class="flow-cell">${record.flow}</td>
                <td>${record.internal_id}</td>
                <td>${record.external_id}</td>
                <td>${record.name}</td>
                <td>${emailCell}</td>
                <td>${formatDateTime(record.date)}</td>
                <td><span class="stage-badge stage-${record.stage}">${record.stage}</span></td>
                <td class="status-cell"><span class="status-badge status-${record.status}">${record.status}</span></td>
                <td>${processIdCell}</td>
            `;
        } else {
            // For other tabs (refund), use the original format
            row.innerHTML = `
                <td class="flow-cell">${record.flow}</td>
                <td>${record.internal_id}</td>
                <td>${record.external_id}</td>
                <td>${record.name}</td>
                <td>${emailCell}</td>
                <td></td>
                <td>${formatDateTime(record.date)}</td>
                <td><span class="stage-badge stage-${record.stage}">${record.stage}</span></td>
                <td class="status-cell"><span class="status-badge status-${record.status}">${record.status}</span></td>
                <td>${processIdCell}</td>
            `;
        }
        
        // Add click event for rows that have line items (excluding deposits)
        if (hasLineItems(record.external_id) && currentTab !== 'deposit') {
            row.style.cursor = 'pointer';
            row.addEventListener('click', () => viewDetails(record.external_id));
        }
        
        tbody.appendChild(row);
    });
}

// Render Table
function renderTable() {
    const tbody = document.getElementById('mainTableBody');
    tbody.innerHTML = '';

    filteredData.forEach((row, index) => {
        const tr = document.createElement('tr');
        tr.dataset.index = index;
        tr.dataset.externalId = row.external_id;
        
        tr.innerHTML = `
            <td>${row.flow}</td>
            <td>${row.internal_id}</td>
            <td>${row.external_id}</td>
            <td>${row.name}</td>
            <td>${formatDateTime(row.date)}</td>
            <td><span class="stage-badge stage-${row.stage}">${row.stage}</span></td>
            <td><span class="status-badge status-${row.status}">${row.status}</span></td>
            <td>${row.error_msg}</td>
            <td>${formatDateTime(row.last_update)}</td>
        `;

        // Add click event for row selection
        tr.addEventListener('click', function(e) {
            selectRow(this);
        });

        tbody.appendChild(tr);
    });
}

// Select Row
function selectRow(rowElement) {
    // Remove previous selection
    document.querySelectorAll('#mainTableBody tr').forEach(tr => {
        tr.classList.remove('selected');
    });

    // Add selection to current row
    rowElement.classList.add('selected');
    selectedRow = rowElement.dataset.externalId;

    // Show line items if available
    if (hasLineItems(selectedRow)) {
        viewDetails(selectedRow);
    }
}

// Show Line Items
function showLineItems(lineItems, title) {
    const container = document.getElementById('lineItemsContainer');
    const titleElement = document.getElementById('lineItemsTitle');
    const tbody = document.getElementById('lineItemsTableBody');
    
    if (!container || !titleElement || !tbody) return;
    
    titleElement.textContent = title;
    tbody.innerHTML = '';
    
    if (lineItems.length > 0) {
        lineItems.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.item}</td>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>$${item.tax_amount.toFixed(2)}</td>
                <td>$${item.total.toFixed(2)}</td>
            `;
            tbody.appendChild(row);
        });
    } else {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="6" style="text-align: center; color: #6c757d; padding: 20px;">No details available</td>';
        tbody.appendChild(row);
    }
    
    container.style.display = 'block';
    container.scrollIntoView({ behavior: 'smooth' });
}

// Close Line Items
function closeLineItems() {
    const container = document.getElementById('lineItemsContainer');
    if (container) {
        container.style.display = 'none';
    }
    
    // Hide all sections
    document.getElementById('lineItemsSection').style.display = 'none';
    document.getElementById('associatedRecordsSection').style.display = 'none';
    
    selectedRow = null;
    
    // Remove row selection
    document.querySelectorAll('#mainTableBody tr').forEach(tr => {
        tr.classList.remove('selected');
    });
}

// View Details
function viewDetails(externalId) {
    const record = filteredData.find(r => r.external_id === externalId);
    if (!record) return;
    
    // Hide all sections initially
    document.getElementById('lineItemsSection').style.display = 'none';
    document.getElementById('associatedRecordsSection').style.display = 'none';
    
    if (currentTab === 'order') {
        // Show line items
        const lineItems = sampleLineItems[externalId] || [];
        if (lineItems.length > 0) {
            document.getElementById('lineItemsSection').style.display = 'block';
            
            // Show all columns for order
            document.getElementById('priceLevelHeader').style.display = 'table-cell';
            document.getElementById('priceHeader').style.display = 'table-cell';
            document.getElementById('amountHeader').style.display = 'table-cell';
            document.getElementById('taxCodeHeader').style.display = 'table-cell';
            document.getElementById('taxAmountHeader').style.display = 'table-cell';
            document.getElementById('shpLineIdHeader').style.display = 'table-cell';
            document.getElementById('locationHeader').style.display = 'none';
            
            // Reset location header text to LOCATION for order
            document.getElementById('locationHeader').textContent = 'LOCATION';
            
            populateLineItemsTable(lineItems);
        }
        
        // Show associated records
        const associatedRecords = sampleAssociatedRecords[externalId] || [];
        if (associatedRecords.length > 0) {
            document.getElementById('associatedRecordsSection').style.display = 'block';
            populateAssociatedRecordsTable(associatedRecords);
        }
        
        document.getElementById('lineItemsTitle').textContent = 'Order Details';
        document.getElementById('lineItemsHeader').textContent = 'Order Lines';
        
    } else if (currentTab === 'fulfillment') {
        // Show line items
        const lineItems = sampleLineItems[externalId] || [];
        if (lineItems.length > 0) {
            document.getElementById('lineItemsSection').style.display = 'block';
            
            // Reset all headers first to ensure proper state
            document.getElementById('priceLevelHeader').style.display = 'table-cell';
            document.getElementById('priceHeader').style.display = 'table-cell';
            document.getElementById('amountHeader').style.display = 'table-cell';
            document.getElementById('taxCodeHeader').style.display = 'table-cell';
            document.getElementById('taxAmountHeader').style.display = 'table-cell';
            document.getElementById('shpLineIdHeader').style.display = 'table-cell';
            document.getElementById('locationHeader').style.display = 'none';
            
            // Hide price-related columns for fulfillment
            document.getElementById('priceLevelHeader').style.display = 'none';
            document.getElementById('priceHeader').style.display = 'none';
            document.getElementById('amountHeader').style.display = 'none';
            document.getElementById('taxCodeHeader').style.display = 'none';
            document.getElementById('taxAmountHeader').style.display = 'none';
            document.getElementById('shpLineIdHeader').style.display = 'none';
            document.getElementById('locationHeader').style.display = 'table-cell';
            
            // Change location header text to LOCATION for fulfillment
            document.getElementById('locationHeader').textContent = 'LOCATION';
            
            // Small delay to ensure DOM updates are applied
            setTimeout(() => {
                populateLineItemsTable(lineItems);
            }, 10);
        }
        
        // Show associated records
        const associatedRecords = sampleAssociatedRecords[externalId] || [];
        if (associatedRecords.length > 0) {
            document.getElementById('associatedRecordsSection').style.display = 'block';
            populateAssociatedRecordsTable(associatedRecords);
        }
        
        document.getElementById('lineItemsTitle').textContent = 'Fulfillment Details';
        document.getElementById('lineItemsHeader').textContent = 'Fulfilled Lines';
        
    } else if (currentTab === 'products' && record.matrix_type === 'PARENT') {
        // Show child items for matrix products
        const childItems = sampleChildItems[externalId] || [];
        if (childItems.length > 0) {
            document.getElementById('lineItemsSection').style.display = 'block';
            populateLineItemsTable(childItems);
        }
        
        document.getElementById('lineItemsTitle').textContent = 'Variants';
        
    } else if (currentTab === 'refund') {
        // Show refund details as line items
        const lineItems = [
            { 
                internal_id: record.internal_id || '',
                external_id: record.external_id || '',
                item_id: 'Refund Amount', 
                name: `$${record.refund_amount?.toFixed(2) || '0.00'}`, 
                sku: 'N/A',
                price_level: 'N/A',
                price: record.refund_amount || 0,
                quantity: 1, 
                amount: record.refund_amount || 0, 
                tax_code: 'N/A', 
                tax_amount: 0,
                shp_line_id: 'N/A'
            },
            { 
                internal_id: record.internal_id || '',
                external_id: record.external_id || '',
                item_id: 'Original Order', 
                name: record.original_order || 'N/A', 
                sku: 'N/A',
                price_level: 'N/A',
                price: 0,
                quantity: 1, 
                amount: 0, 
                tax_code: 'N/A', 
                tax_amount: 0,
                shp_line_id: 'N/A'
            },
            { 
                internal_id: record.internal_id || '',
                external_id: record.external_id || '',
                item_id: 'Customer', 
                name: record.customer_name || 'N/A', 
                sku: 'N/A',
                price_level: 'N/A',
                price: 0,
                quantity: 1, 
                amount: 0, 
                tax_code: 'N/A', 
                tax_amount: 0,
                shp_line_id: 'N/A'
            }
        ];
        
        document.getElementById('lineItemsSection').style.display = 'block';
        populateLineItemsTable(lineItems);
        
        // Show associated records for refunds
        const associatedRecords = sampleAssociatedRecords[externalId] || [];
        if (associatedRecords.length > 0) {
            document.getElementById('associatedRecordsSection').style.display = 'block';
            populateAssociatedRecordsTable(associatedRecords);
        }
        
        document.getElementById('lineItemsTitle').textContent = 'Integration Records Status - Refund Details';
    }
    
    // Show the container
    document.getElementById('lineItemsContainer').style.display = 'block';
    document.getElementById('lineItemsContainer').scrollIntoView({ behavior: 'smooth' });
}

// Function to populate line items table
function populateLineItemsTable(lineItems) {
    const tbody = document.getElementById('lineItemsTableBody');
    tbody.innerHTML = '';
    
    if (lineItems.length > 0) {
        lineItems.forEach(item => {
            const row = document.createElement('tr');
            
                                            if (currentTab === 'fulfillment') {
                                    // For fulfillment, show: internal_id, item_id, name, sku, quantity, location
                                    row.innerHTML = `
                                        <td>${item.internal_id || ''}</td>
                                        <td>${item.item_id || ''}</td>
                                        <td>${item.name || ''}</td>
                                        <td>${item.sku || ''}</td>
                                        <td>${item.quantity || ''}</td>
                                        <td>$${item.amount?.toFixed(2) || '0.00'}</td>
                                    `;
            } else {
                // For other tabs (order, products), show all columns
                row.innerHTML = `
                    <td>${item.internal_id || ''}</td>
                    <td>${item.item_id || ''}</td>
                    <td>${item.name || ''}</td>
                    <td>${item.sku || ''}</td>
                    <td>${item.price_level || ''}</td>
                    <td>$${item.price?.toFixed(2) || '0.00'}</td>
                    <td>${item.quantity || ''}</td>
                    <td>$${item.amount?.toFixed(2) || '0.00'}</td>
                    <td>${item.tax_code || ''}</td>
                    <td>$${item.tax_amount?.toFixed(2) || '0.00'}</td>
                    <td>${item.shp_line_id || ''}</td>
                `;
            }
            tbody.appendChild(row);
        });
    } else {
        const colspan = currentTab === 'fulfillment' ? 6 : 11;
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="${colspan}" style="text-align: center; color: #6c757d; padding: 20px;">No line items available</td>`;
        tbody.appendChild(row);
    }
}

// Function to populate associated records table
function populateAssociatedRecordsTable(associatedRecords) {
    const tbody = document.getElementById('associatedRecordsTableBody');
    tbody.innerHTML = '';
    
    if (associatedRecords.length > 0) {
        associatedRecords.forEach(record => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${record.type}</td>
                <td>${record.internal_id || ''}</td>
                <td>${record.external_id || ''}</td>
                <td>${formatDateTime(record.date)}</td>
                <td>${record.name || ''}</td>
                <td>${record.amount ? `$${record.amount.toFixed(2)}` : 'N/A'}</td>
                <td>${record.applied_on || 'N/A'}</td>
                <td><span class="status-badge status-${record.status.toLowerCase().replace(' ', '-')}">${record.status}</span></td>
            `;
            tbody.appendChild(row);
        });
    } else {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="8" style="text-align: center; color: #6c757d; padding: 20px;">No associated records available</td>';
        tbody.appendChild(row);
    }
}

// Apply Filters
function applyFilters() {
    applyDynamicFilters();
}

// Clear Filters
function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('dateFrom').value = '';
    document.getElementById('dateTo').value = '';
    document.getElementById('statusFilter').value = '';
    document.getElementById('stageFilter').value = '';
    
    applyFilters();
}

// Refresh Data
function refreshData() {
    loadData();
}

// Show Loading
function showLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.add('show');
    }
}

// Hide Loading
function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.remove('show');
    }
}

// Format DateTime
function formatDateTime(dateString) {
    try {
        const date = new Date(dateString);
        return date.toLocaleString();
    } catch (error) {
        return dateString; // Return original string if parsing fails
    }
}

// Export Functions (for external use)
window.dashboardFunctions = {
    switchTab,
    toggleCharts,
    applyFilters,
    clearFilters,
    refreshData,
    closeLineItems,
    viewDetails,
    hasLineItems // Added hasLineItems to the export
}; 

// Function to check if a record has line items
function hasLineItems(externalId) {
    if (currentTab === 'products') {
        const record = sampleData[currentTab].find(r => r.external_id === externalId);
        return record && record.matrix_type === 'PARENT' && sampleChildItems[externalId];
    } else if (['order', 'fulfillment'].includes(currentTab)) {
        return sampleLineItems[externalId] && sampleLineItems[externalId].length > 0;
    } else if (currentTab === 'refund') {
        return false; // Refunds don't have line items
    }
    return false;
}

// Function to update summary boxes
function updateSummaryBoxes(data = null) {
    const dataToUse = data || filteredData;
    const totalRecords = dataToUse.length;
    const totalSuccess = dataToUse.filter(record => record.status === 'success').length;
    const totalReady = dataToUse.filter(record => record.status === 'ready').length;
    const totalFailed = dataToUse.filter(record => record.status === 'failed').length;

    // Update summary boxes
    const summaryBoxes = document.querySelectorAll('.summary-box');
    if (summaryBoxes.length >= 4) {
        summaryBoxes[0].querySelector('.count').textContent = totalRecords;
        summaryBoxes[1].querySelector('.count').textContent = totalSuccess;
        summaryBoxes[2].querySelector('.count').textContent = totalReady;
        summaryBoxes[3].querySelector('.count').textContent = totalFailed;
    }
}

// Sample filter options for random generation
const filterOptions = {
    'Status': ['Ready', 'Success', 'Failed'],
    'Stage': ['Landed', 'Prepared', 'Target'],
    'Flow': ['SHP → NS', 'NS → SHP'],
    'External Id': ['SHP_CUST_001', 'SHP_CUST_002', 'SHP_ORD_001', 'SHP_ORD_002', 'NS_PROD_001', 'NS_PROD_002'],
    'Internal Id': ['CUST_001', 'CUST_002', 'ORD_001', 'ORD_002', 'PROD_001', 'PROD_002']
};

// Function to generate random filter
function generateRandomFilter() {
    const filterTypes = Object.keys(filterOptions);
    const randomType = filterTypes[Math.floor(Math.random() * filterTypes.length)];
    const values = filterOptions[randomType];
    const randomValue = values[Math.floor(Math.random() * values.length)];
    return { type: randomType, value: randomValue };
}

// Function to add a new filter
function addNewFilter() {
    const filterLeft = document.querySelector('.filter-left');
    if (!filterLeft) return;

    const newFilter = generateRandomFilter();
    const filterId = 'filter_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    const filterElement = document.createElement('div');
    filterElement.className = 'filter-info';
    filterElement.id = filterId;
    filterElement.innerHTML = `
        <span class="filter-label">${newFilter.type}</span>
        <span class="filter-separator">|</span>
        <span class="filter-value">${newFilter.value}</span>
        <button class="remove-filter-btn" title="Remove Filter" onclick="removeFilter('${filterId}')">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Insert the new filter after the existing filter-info
    const existingFilterInfo = filterLeft.querySelector('.filter-info');
    if (existingFilterInfo) {
        existingFilterInfo.parentNode.insertBefore(filterElement, existingFilterInfo.nextSibling);
    } else {
        filterLeft.appendChild(filterElement);
    }

    // Apply the new filter
    applyDynamicFilters();
}

// Function to remove a specific filter
function removeFilter(filterId) {
    const filterElement = document.getElementById(filterId);
    if (filterElement) {
        filterElement.remove();
        applyDynamicFilters();
    }
}

// Function to apply all dynamic filters
function applyDynamicFilters() {
    const activeFilters = [];
    
    // Get all filter-info elements
    const filterElements = document.querySelectorAll('.filter-info');
    filterElements.forEach(filter => {
        const label = filter.querySelector('.filter-label');
        const value = filter.querySelector('.filter-value');
        if (label && value) {
            activeFilters.push({
                type: label.textContent,
                value: value.textContent
            });
        }
    });

    // Apply filters to the data
    applyFiltersWithDynamicFilters(activeFilters);
}

// Function to apply filters including dynamic ones
function applyFiltersWithDynamicFilters(dynamicFilters) {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const startDate = document.getElementById('dateFrom').value;
    const endDate = document.getElementById('dateTo').value;
    const statusFilter = document.getElementById('statusFilter').value;
    const stageFilter = document.getElementById('stageFilter').value;

    filteredData = sampleData[currentTab].filter(record => {
        // Basic filters
        let matches = true;

        // Search filter
        if (searchTerm) {
            const searchFields = [
                record.internal_id,
                record.external_id,
                record.name,
                record.status,
                record.stage,
                record.flow
            ].join(' ').toLowerCase();
            matches = matches && searchFields.includes(searchTerm);
        }

        // Date filter
        if (startDate && endDate) {
            const recordDate = new Date(record.date);
            const start = new Date(startDate);
            const end = new Date(endDate);
            matches = matches && recordDate >= start && recordDate <= end;
        }

        // Status filter
        if (statusFilter && statusFilter !== 'all') {
            matches = matches && record.status === statusFilter;
        }

        // Stage filter
        if (stageFilter && stageFilter !== 'all') {
            matches = matches && record.stage === stageFilter;
        }

        // Dynamic filters
        dynamicFilters.forEach(filter => {
            switch (filter.type) {
                case 'Status':
                    matches = matches && record.status === filter.value;
                    break;
                case 'Stage':
                    matches = matches && record.stage === filter.value;
                    break;
                case 'Flow':
                    matches = matches && record.flow === filter.value;
                    break;
                case 'External Id':
                    matches = matches && record.external_id.includes(filter.value);
                    break;
                case 'Internal Id':
                    matches = matches && record.internal_id.includes(filter.value);
                    break;
            }
        });

        return matches;
    });

    populateSummaryTable();
    updateSummaryBoxes();
} 