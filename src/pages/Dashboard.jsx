
import * as React from 'react';
import * as ReactDOM from "react-dom";
import { ButtonGroup, Button } from '@progress/kendo-react-buttons';
import { DateRangePicker } from '@progress/kendo-react-dateinputs';

import { useLocalization } from '@progress/kendo-react-intl';
import { filterBy } from '@progress/kendo-data-query';
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";

import { Grid, Column, ColumnMenu } from './../components/Grid';
import { Chart,ChartSeries,
  ChartSeriesItem } from '@progress/kendo-react-charts';
  
import { FullNameCell, FlagCell, OnlineCell, RatingCell, EngagementCell, CurrencyCell } from './../components/GridCells';

import { AppContext } from './../AppContext'

import { employees } from './../resources/employees';
import { teams } from './../resources/teams';
import { orders } from './../resources/orders';
import { inquiries } from './../resources/inquiries';

import pets from '../pets.json';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import categories from '../categories.json';

import { process } from '@progress/kendo-data-query';

import {Grid as GridKen,  GridColumn } from '@progress/kendo-react-grid';
import { Window } from '@progress/kendo-react-dialogs';
import { Window as window1} from '@progress/kendo-react-dialogs';
import products from '../products.json';
import Petgrid from './Petgrid';
import 'hammerjs';



const Dashboard = () => {
    const [data, setData] = React.useState(employees);
    const [isTrend, setIsTrend] = React.useState(true);
    const [isMyTeam, setIsMyTeam] = React.useState(true);
    const [gridDataState, setgridDataState] = React.useState([ {
        sort: [
          { field: "name", dir: "asc" }
        ],
        skip: 0,
        take: 10,
        // filters: [{ field: 'address_city', operator: 'eq', value: 'Denver' }]
      }]);
    const [visible, setVisible] = React.useState(false);
    const [windowvisible, setwindowVisible] = React.useState(false);
    const [gridClickedRow, setgridDclickedRow] = React.useState({});
    const localizationService = useLocalization();
    const [contactvisible, setcontactVisible] = React.useState(false);
    const [dropdownlistCategory, setcdropdownlistCategory] = React.useState(null);
    const isChartChangeRef = React.useRef(false);
    const onChartRefresh = React.useCallback(
        () => null,
        []
    );

    const handleDropDownChange = (e) => {
        let newDataState = { ...gridDataState }
        console.log(e.target.value.CategoryID);
        if (e.target.value.CategoryID !== null) {
          newDataState.filter = {
            logic: 'and',
            filters: [{ field: 'address_city', operator: 'eq', value: 'Denver' }]
          }
          newDataState.skip = 0
        } else {
          newDataState.filter = []
          newDataState.skip = 0
        }
    
          setcdropdownlistCategory(e.target.value.CategoryID);
          setgridDataState(newDataState);
      };

    React.useEffect(() => {
        isChartChangeRef.current = false;
    });

    const { teamId } = React.useContext(AppContext);
    const gridFilterExpression = isMyTeam ? {
            logic: "and",
            filters: [{ field: "teamId", operator: "eq", value: teamId }]
        } : null;

    const [range, setRange] = React.useState({
        start: new Date('2020-01-01T21:00:00.000Z'),
        end: new Date('2020-04-29T21:00:00.000Z')
    });
    const onRangeChange = React.useCallback(
        (event) => {
            setRange({
                start: event.value.start,
                end: event.value.end
            })
        },
        [setRange]
    );
    const trendOnClick = React.useCallback(
        () => {
            isChartChangeRef.current = true;
            setIsTrend(true);
        },
        [setIsTrend]
    );
    const volumeOnClick = React.useCallback(
        () => {
            isChartChangeRef.current = true;
            setIsTrend(false);
        },
        [setIsTrend]
    );
    const myTeamOnClick = React.useCallback(
        () => setIsMyTeam(true),
        [setIsMyTeam]
    );
    const allTeamOnClick = React.useCallback(
        () => setIsMyTeam(false),
        [setIsMyTeam]
    );
   
    const handleGridDataStateChange = (e) => {
        setgridDataState({gridDataState: e.dataState});
      }

     const   handleGridRowClick = (e) => {
        // this.setState({
        //     windowvisible: true,
        //     gridClickedRow: e.dataItem
        // });
        setwindowVisible(true);
        setgridDclickedRow(e.dataItem);

    }

   const closeWindow = (e) => {
     setwindowVisible(false);
    }
   const  toggleDialog = () => {
    setVisible(!visible);
      }
   const itech = <iframe class="airtable-embed airtable-dynamic-height" src="https://airtable.com/embed/shrDOA2P9D9svKUP9?backgroundColor=blue&viewControls=on" 
     frameborder="0" onmousewheel="" width="56%" height="533" 
     style={{background: 'transparent border: 1px solid #ccc'}}></iframe>

    const text = (
        <div id="Inbox" className="page inbox-page">
          <ul>
            <li>
              {/* <h6>Upload things</h6> */}
              <p>
              {/* <iframe class="airtable-embed airtable-dynamic-height" src="https://airtable.com/embed/shrWJeT4EqoUC17V4?backgroundColor=blue&viewControls=on"  style={{background: "transparent", border: "1px solid #ccc", frameborder:"0",  width:"60%", height:"100%"}}></iframe>  */}
              {itech}
              </p>
            </li>
            <li>
              <h6></h6>
              <p>ARE YOU A SHELTER ADMIN...CONTACT US</p>
            </li>
          </ul>
        </div>
      );

      const dialog = <div>
      {/* <button className="k-button" onClick={toggleDialog}>
        Open Dialog
      </button> */}
      {visible && (
        <Dialog title={"Please confirm"} onClose={toggleDialog}>
          <p
            style={{
              margin: "25px",
              textAlign: "center",
            }}
          >
            Are you sure you want to continue?
            {/* {itech} */}
          </p>
          <DialogActionsBar>
            <button className="k-button" onClick={toggleDialog}>
              cancel
            </button>
            <button className="k-button" onClick={toggleDialog}>
              Ok 
            </button><br/>
            <iframe class="airtable-embed airtable-dynamic-height" src="https://airtable.com/embed/shrDOA2P9D9svKUP9?backgroundColor=blue&viewControls=on" 
     frameborder="0" backgroundColor="blue" onmousewheel="" width="76%" height="603" 
     style={{background: 'transparent border: 1px solid #ccc'}}></iframe>
          </DialogActionsBar>
        </Dialog>
      )}
    </div>;
    
    const seriesData = [{
      product: "Chai",
        sales: 200
    }, {
        product: "Others",
        sales: 250
    }];

    const ChartInquiry = () => (
      <Chart>
          <ChartSeries>
              <ChartSeriesItem data={seriesData} type="column" field="sales" categoryField="product" />
          </ChartSeries>
      </Chart>
    );

    return (
        <div id="Dashboard" className="dashboard-page main-content">
            <div  className="card-container">
            
            <Grid
             data={pets}
          // pageable={true}
          // sortable={true}
        //   {...this.state.gridDataState}
          onRowClick={handleGridRowClick}
          // onDataStateChange={this.handleGridDataStateChange}
          style={{ height: "400px", width:"100%" }}>
          <GridColumn field="animals_name" title="Pet Name" />
          <GridColumn field="breeds" title="breed"  />
          <GridColumn field="contact_email" title="email" />
          <GridColumn field="animals_photos1"  title="photo" />
          
          <GridColumn field="address_city" title="_city" />
          {/* <GridColumn field="Discontinued" cell={checkboxColumn} />  */}
        </Grid>
        { windowvisible &&
          <Window
            title="Pet Details"
            onClose={closeWindow}
            height={350}>
            <dl style={{textAlign:"left"}}>
              <dt> Name</dt>
              <dd>{gridClickedRow.animals_name}</dd>
              <dt>contact </dt>
              <dd>{gridClickedRow.contact_email}</dd>
              <dt>photo</dt>
              <dd><img src={gridClickedRow.animals_photos1} ></img></dd>
            </dl>
            
          </Window>
        } 
            {dialog}
            {contactvisible &&
            <window1 title={"Status"} onClose={toggleDialog} initialHeight={600} width={700} align="right">
                      
              {text}
            </window1>}
            
               
                <div className="card-buttons" align ="center">
                <h4 align="center">Contact Us </h4>
                    <button className="k-button btn-primary" style={{backgroundColor:"#ff5e2f" , color:"#fff", width:"60%",  height:"50px"}}  onClick={toggleDialog}>{localizationService.toLanguageString('custom.involve')}</button><br/><br>
                   </br>
                   <button className="k-button btn-primary" style={{backgroundColor:"#ff5e2f" , color:"#fff", width:"60%",  height:"50px"}}  onClick={toggleDialog}>Are you a Lost dog Owner</button><br/><br></br>
                    
                     {/* <ButtonGroup>
                        <Button togglable={true} selected={isTrend} onClick={trendOnClick}>
                            {localizationService.toLanguageString('custom.trend')}
                        </Button>
                        <Button togglable={true} selected={!isTrend} onClick={volumeOnClick}>
                            {localizationService.toLanguageString('custom.volume')}
                        </Button>
             
                    </ButtonGroup>  */}
              
                </div>
                <h3 className="card-title">Pet Inquiries</h3>
                {/* <div className="card-ranges">
                    <DateRangePicker value={range} onChange={onRangeChange} />
                </div> */}
                <div className="card-component">
                    {/* { <Chart
                        data={orders}
                        filterStart={range.start}
                        filterEnd={range.end}
                        groupByField={'state'}
                        groupResourceData={teams}
                        groupTextField={'teamName'}
                        groupColorField={'teamColor'}
                        seriesCategoryField={'orderDate'}
                        seriesField={'orderTotal'}
                        seriesType={isTrend ? 'line' : 'column'}
                        onRefresh={isChartChangeRef.current ? null : onChartRefresh}
                    /> } */}
         {            <Chart>
          <ChartSeries>
              <ChartSeriesItem data={inquiries} type="line" field="inquiryTotal" categoryField="breeds" />
          </ChartSeries>
      </Chart> }
                </div>
            </div>
            <div className="card-container grid">
                <h3 className="card-title"></h3>
                <div className="card-buttons">
                   
                </div>
                <span></span>
                <div className="card-component"><p>
          {/* <DropDownList
            data={categories}
            dataItemKey="CategoryID"
            textField="CategoryName"
            defaultItem={{CategoryID: null, CategoryName: "select city"}}
            onChange={handleDropDownChange}
            />
          &nbsp; Selected category ID: <strong>{null}</strong> */}
        </p> 
                   
                    {/* <Grid
                      data={process(products, gridDataState)}
                      pageable={true}
                      sortable={true}
                      {...gridDataState}
                      onDataStateChange={handleGridDataStateChange}
                      style={{ height: "400px" }}>
                      <GridColumn field="ProductName" title="Product Name" />
                      <GridColumn field="UnitPrice" title="Price" format="{0:c}" />
                      <GridColumn field="UnitsInStock" title="Units in Stock" />
                      {/* <GridColumn field="Discontinued" cell={checkboxColumn} /> */}
                    {/* </Grid>  */}
                    <Petgrid />
                </div>
                
            </div>
            
        </div>
    );
}

export default Dashboard;

