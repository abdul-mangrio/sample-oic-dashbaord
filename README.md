# Integration Dashboard

A modern, responsive web-based dashboard for managing integration data across multiple entities including Customers, Orders, Fulfillments, Refunds, Products, and Customer Deposits.

## Features

### 🎯 Core Functionality
- **Multi-tab Interface**: Switch between different data entities (Customer, Customer Deposit, Order, Fulfillment, Refund, Products)
- **Dynamic Data Tables**: Each tab displays relevant data with common columns (INTERNAL_ID, EXTERNAL_ID, NAME, STATUS, DATE)
- **Real-time Search**: Search across all fields with instant filtering
- **Advanced Filtering**: Filter by date range and status
- **Line Item Details**: Click on Order, Fulfillment, or Refund rows to view detailed line items
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### 🎨 User Interface
- **Modern Design**: Clean, professional interface with gradient backgrounds and smooth animations
- **Status Badges**: Color-coded status indicators for easy identification
- **Interactive Elements**: Hover effects, smooth transitions, and visual feedback
- **Loading States**: Professional loading overlays during data operations
- **Custom Scrollbars**: Styled scrollbars for better user experience

### 📊 Data Management
- **Sample Data**: Pre-loaded with realistic sample data for demonstration
- **Dynamic Filtering**: Real-time filtering based on search terms, dates, and status
- **Record Counting**: Live count of filtered records
- **Row Selection**: Visual feedback for selected rows
- **Action Buttons**: Quick access to view details for each record

## File Structure

```
integration-dashboard/
├── integration-dashboard.html    # Main HTML file
├── dashboard-styles.css          # CSS styling and responsive design
├── dashboard-script.js           # JavaScript functionality and data management
└── README.md                     # This documentation file
```

## Setup Instructions

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required (uses CDN for Font Awesome icons)

### Installation
1. Download all files to a local directory
2. Open `integration-dashboard.html` in your web browser
3. The dashboard will load automatically with sample data

### For Production Use
1. Replace the sample data in `dashboard-script.js` with your actual API endpoints
2. Modify the data structure to match your backend response format
3. Update the line items logic to fetch from your actual data source
4. Customize the styling in `dashboard-styles.css` to match your brand colors

## Usage Guide

### Navigating the Dashboard

#### Tab Navigation
- Click on any tab (Customer, Customer Deposit, Order, etc.) to switch between different data views
- Each tab loads its respective data and updates the table accordingly
- The active tab is highlighted with a gradient background

#### Search and Filtering
- **Search Box**: Type any term to search across INTERNAL_ID, EXTERNAL_ID, and NAME fields
- **Date Range**: Select "From" and "To" dates to filter records within a specific period
- **Status Filter**: Choose from predefined status options (Active, Pending, Completed, Cancelled, Failed)
- **Apply Filters**: Click "Apply Filters" to apply all selected filters
- **Clear Filters**: Click "Clear" to reset all filters to default values

#### Table Interactions
- **Row Selection**: Click on any row to select it (highlighted with a blue border)
- **Line Items**: For Orders, Fulfillments, and Refunds, selecting a row will display detailed line items below
- **View Details**: Click the eye icon in the Actions column to view detailed information
- **Sorting**: Click on column headers to sort data (if implemented in your data source)

#### Line Items View
- **Automatic Display**: Line items appear automatically when selecting Order, Fulfillment, or Refund rows
- **Detailed Information**: Shows Item ID, Name, Quantity, Price, Tax Amount, and Total
- **Close Button**: Click the X button to close the line items view
- **Smooth Animation**: Line items slide in with a smooth animation effect

### Data Structure

#### Main Table Structure
Each entity follows this common structure:
```javascript
{
    internal_id: "UNIQUE_ID",
    external_id: "EXTERNAL_SYSTEM_ID", 
    name: "Display Name",
    status: "active|pending|completed|cancelled|failed",
    date: "YYYY-MM-DD"
}
```

#### Line Items Structure
For Orders, Fulfillments, and Refunds:
```javascript
{
    item: "ITEM_ID",
    name: "Item Name",
    quantity: 1,
    price: 99.99,
    tax_amount: 9.99,
    total: 109.98
}
```

## Customization

### Styling Customization
- **Colors**: Modify CSS variables in `dashboard-styles.css` to change the color scheme
- **Fonts**: Update the font-family property to use your preferred fonts
- **Layout**: Adjust grid layouts and spacing to match your design requirements
- **Animations**: Customize transition effects and animations

### Functionality Customization
- **Data Source**: Replace sample data with API calls to your backend
- **Additional Filters**: Add more filter options based on your data requirements
- **Export Features**: Add export functionality for filtered data
- **Real-time Updates**: Implement WebSocket connections for live data updates

### Adding New Tabs
1. Add a new tab button in the HTML
2. Add corresponding data structure in the JavaScript
3. Update the tab switching logic
4. Add any specific functionality for the new entity type

## Browser Compatibility

- **Chrome**: 60+
- **Firefox**: 55+
- **Safari**: 12+
- **Edge**: 79+

## Performance Considerations

- **Large Datasets**: The dashboard is optimized for datasets up to 10,000 records
- **Memory Usage**: Efficient DOM manipulation and event handling
- **Loading States**: Proper loading indicators for better user experience
- **Responsive Design**: Optimized for various screen sizes and resolutions

## Troubleshooting

### Common Issues

1. **Dashboard not loading**: Ensure all files are in the same directory
2. **Icons not displaying**: Check internet connection (Font Awesome is loaded from CDN)
3. **Filters not working**: Verify that the data structure matches the expected format
4. **Line items not showing**: Ensure the internal_id matches between main data and line items data

### Debug Mode
Add `?debug=true` to the URL to enable console logging for troubleshooting.

## Future Enhancements

- [ ] Export to Excel/CSV functionality
- [ ] Real-time data synchronization
- [ ] Advanced sorting capabilities
- [ ] Bulk operations (delete, update status)
- [ ] User authentication and role-based access
- [ ] Dark mode theme
- [ ] Data visualization charts
- [ ] Mobile app version

## Support

For questions or issues, please refer to the code comments or create an issue in the project repository.

## License

This project is open source and available under the MIT License. 