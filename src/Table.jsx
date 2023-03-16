import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, fetchAddData } from './tableSlice';
import { useEffect, useMemo, useState } from 'react';
import { IconButton} from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// import {ReactComponent as Delete} from './icons/delete.svg';
import deleteIcon from './icons/delete.png';

import './table.scss'

const Table = () => {

    const dispatch = useDispatch();

    const {id} = useSelector(state => state.table);
    const {documentStatus} = useSelector(state => state.table);
    const {employeeNumber} = useSelector(state => state.table);
    const {documentType} = useSelector(state => state.table);
    const {documentName} = useSelector(state => state.table);
    const {companySignatureName} = useSelector(state => state.table);
    const {employeeSignatureName} = useSelector(state => state.table);
    const {employeeSigDate} = useSelector(state => state.table);
    const {companySigDate} = useSelector(state => state.table);

    const {HOST} = useSelector(state => state.login);
    const {token} = useSelector(state => state.login);
    useEffect(() => {
        dispatch(fetchData({url: `${HOST}/ru/data/v3/testmethods/docs/userdocs/get`, personalToken: token}));
    }, [])

    const rowArr = id.map((item , i) => {
        return {
         id: item,
         documentStatus: documentStatus[i],
         employeeNumber: employeeNumber[i],
         documentType: documentType[i],
         documentName: documentName[i],
         companySignatureName: companySignatureName[i],
         employeeSignatureName: employeeSignatureName[i],
         employeeSigDate: employeeSigDate[i],
         companySigDate: companySigDate[i],
        }
      })

     

    console.log(rowArr)
    const [rows, setRows] = useState(rowArr);
    console.log(rows)

    const [selectionModel, setSelectionModel] = useState([]);
    
    
 

    const columns = [
        { field: 'id', headerName: 'ID', width: 70, editable: true },
        { field: 'documentStatus', headerName: 'documentStatus', width: 130, editable: true},
        { field: 'employeeNumber', headerName: 'employeeNumber', type: 'number', width: 100, editable: true},
        { field: 'documentType', headerName: 'documentType', width: 130, editable: true },
        { field: 'documentName', headerName: 'documentName', width: 130, editable: true },
        { field: 'companySignatureName', headerName: 'companySignatureName', width: 150, editable: true },
        { field: 'employeeSignatureName', headerName: 'employeeSignatureName', width: 150, editable: true },
        { field: 'employeeSigDate', headerName: 'employeeSigDate', width: 200, editable: true },
        { field: 'companySigDate', headerName: 'companySigDate', width: 200, editable: true },
        {
            field: "delete",
            width: 75,
            sortable: false,
            disableColumnMenu: true,
            renderHeader: () => {
              return (
                <IconButton
                  onClick={() => {
                    const selectedIDs = new Set(selectionModel);
                    // you can call an API to delete the selected IDs
                    // and get the latest results after the deletion
                    // then call setRows() to update the data locally here
                    setRows((r) => r.filter((x) => !selectedIDs.has(x.id)));
                  }}
                >
                   <DeleteOutlinedIcon />
                </IconButton>
              );
            }
          }
      ];


    return <div style={{ height: '60vh', width: '74%',}}>
              <div className="add__document">
                <div className="add__text">Добавьте документ</div>
                <form
                  className="add__form">
                  <input type="text"
                      className="add__value"
                      placeholder="documentStatus"
                      name="documentStatus"
                      />
                  <input type="number"
                      className="add__value"
                      placeholder="employeeNumber"
                      name="employeeNumber"/>
                  <input type="text"
                      className="add__value"
                      placeholder="documentType"
                      name="documentType"
                      />
                  <input type="text"
                      className="add__value"
                      placeholder="documentName"
                      name="documentName"
                      />
                  <input type="text"
                      className="add__value"
                      placeholder="companySignatureName"
                      name="companySignatureName"
                      />
                  <input type="text"
                      className="add__value"
                      placeholder="employeeSignatureName"
                      name="employeeSignatureName"
                      />
                  <input type="date"
                      className="add__value"
                      placeholder="employeeSigDate"
                      name="employeeSigDate"
                      />
                  <input type="date"
                      className="add__value"
                      placeholder="companySigDate"
                      name="companySigDate"
                      />

                  <button type="submit"
                          className="add__value"
                          onClick={(event) => {
                              event.preventDefault();
                    
                              let inputStatus = document.querySelector('input[name="documentStatus"]').value;
                              let inputNumber = document.querySelector('input[name="employeeNumber"]').value;
                              let inputType = document.querySelector('input[name="documentType"]').value;
                              let inputDocName = document.querySelector('input[name="documentName"]').value;
                              let inputCompSignName = document.querySelector('input[name="companySignatureName"]').value;
                              let inputEmpSignName = document.querySelector('input[name="employeeSignatureName"]').value;
                              let inputEmpSigDate = new Date(document.querySelector('input[name="employeeSigDate"]').value).toISOString();
                              let inputCompSigDate = new Date(document.querySelector('input[name="companySigDate"]').value).toISOString();

                              console.log(inputCompSignName);
                              console.log(inputDocName);


                              // onAdd(inputID.value, inputStatus.value, inputNumber.value, inputType.value, inputDocName.value, inputCompSignName.value,
                              //   inputEmpSignName.value, inputEmpSigDate.value, inputCompSigDate.value);
                              dispatch(fetchAddData({url: `${HOST}/ru/data/v3/testmethods/docs/userdocs/create`, compSigDate: inputCompSigDate,
                              compSignName: inputCompSignName, docName: inputDocName, docStatus: inputStatus, docType: inputType, empNum: inputNumber, empSigDate: inputEmpSigDate,
                              empSigName: inputEmpSignName, personalToken: token}));
                          }}>Добавить</button>
                </form>
              </div>
              <DataGrid
                rows={rowArr}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                onCellEditStop={(e) => {console.log(e.target)}}
                checkboxSelection
                onSelectionModelChange={(ids) => {
                    setSelectionModel(ids);
                  }}
              />
             
            </div>
}

export default Table;