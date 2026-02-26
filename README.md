# Next.js ArcGIS Action Item Dashboard

This Next.js app fetches collision summary data from an ArcGIS web service, applies filters, and displays visuals on collision statistic in El Paso.

## Technologies Used

- **Next.js** (for building server-rendered React applications)
- **React** (for building components and managing state)
- **Axios** (for data fetching)
- **CSS Modules** (for component-level styling)

## Installation

Use the following PowerShell script to set up your development environment, install Node.js via `fnm`, and install compatible versions of React, Next.js, and Material UI dependencies.

```powershell
# Install fnm (Fast Node Manager)
>> winget install Schniz.fnm --source winget
>>
>> # Configure fnm environment for the current session
>> fnm env --use-on-cd | Out-String | Invoke-Expression
>>
>> # Install and use Node.js v20 (LTS)
>> fnm use --install-if-missing 22
>>
>> # Confirm Node.js and npm versions
>> node -v   # should be v22.x.x
>> npm -v    # should be 10.x.x
>>
>> # Initialize new project (skip if already initialized)
>> npm init -y
>>
>> # Install stable versions of React, ReactDOM, and Next.js
>> npm install react@18 react-dom@18 next@14
>>
>> # Install Material UI and required Emotion packages
>> npm install @mui/material @emotion/react @emotion/styled
>> npm install react-plotly.js plotly.js
>> npm install
>> # Run your app with Next.js dev server
>> npm run dev
