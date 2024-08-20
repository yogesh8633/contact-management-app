# Contact Management Dashboard

This is a Contact Management Dashboard built with React, TypeScript, Redux, and Ant Design. It also includes data visualization using amCharts and Leaflet maps, with data fetched using React Query from public COVID-19 APIs.

## Features

- **Contact Management**: Add, edit, and delete contacts.
- **COVID-19 Dashboard**: Visualize global COVID-19 data with charts and maps.
- **Responsive Design**: The application is fully responsive and works on all device sizes.

## Folder Structure

```plaintext
├── public
├── src
│   ├── components
│   │   ├── contacts
│   │   │   ├── CreateContactModal.tsx
│   │   │   └── EditContact.tsx
│   │   └── sidebar
│   │       └── Sidebar.tsx
│   ├── features
│   │   └── contacts
│   │       └── contactSlice.ts
│   ├── hooks
│   │   ├── useCountriesData.ts
│   │   ├── useGlobalData.ts
│   │   └── useHistoricalData.ts
│   ├── pages
│   │   ├── ChartsAndMaps.tsx
│   │   └── Contacts.tsx
│   ├── store
│   │   └── store.ts
│   ├── utils
│   │   ├── amcharts.d.ts
│   │   └── api.ts
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── index.tsx
│   ├── logo.svg
│   ├── react-app-env.d.ts
│   └── reportWebVitals.ts
└── package.json
```

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yogesh8633/contact-management-app.git
   cd contact-management-dashboard
2. **Install dependencies:**:
    ```bash
   npm install
3. **Start the development server:**
    ```bash
    npm start
4.  **Build for production:**
    ```bash
    npm run build


### Usage

- **Creating a Contact**: Use the "Create Contact" button to add a new contact. Fill in the required details and save.
- **Editing a Contact**: Navigate to a contact's detail page and click "Edit" to modify the contact's information.
- **Viewing Global COVID-19 Data**: The dashboard provides an overview of global COVID-19 statistics with charts and maps.

## Deployment
**Deployed Link**: [Deployed Link](#https://contact-management-app-kappa-silk.vercel.app)

## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For static typing.
- **Redux**: For state management.
- **Ant Design**: For UI components.
- **amCharts**: For data visualization.
- **React Query**: For data fetching and state synchronization.
- **Leaflet**: For interactive maps.
- **Tailwind CSS**: For utility-first CSS styling.

## API References

- **Global COVID-19 Data**: [disease.sh API - Global Data](https://disease.sh/v3/covid-19/all)
- **Country-Specific COVID-19 Data**: [disease.sh API - Country Data](https://disease.sh/v3/covid-19/countries)
- **Historical COVID-19 Data**: [disease.sh API - Historical Data](https://disease.sh/v3/covid-19/historical/all?lastdays=all)

## Instructions

1. **Clone and Set Up**:
   - Clone the repository and install dependencies as described in the [Installation](#installation) section.

2. **Run the Application**:
   - Use `npm start` to run the application locally and see the dashboard in action.

3. **View Contacts**:
   - Access the "Contacts" page to view, add, edit, or delete contacts.

4. **View COVID-19 Dashboard**:
   - Navigate to the "Charts and Maps" page to view the global COVID-19 statistics, charts, and maps.

5. **Deploying**:
   - Build the project using `npm run build` and deploy it to your preferred platform, such as Vercel.


