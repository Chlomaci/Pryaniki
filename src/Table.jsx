import { useDispatch, useSelector } from 'react-redux';
import { fetchData, fetchAddData, fetchDeleteData, fetchEditData } from './tableSlice';
import { useEffect, useState } from 'react';
import { rowDeleted, rowAdded, onCancelRow } from './tableSlice';

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import {
  GridRowModes,
  DataGridPro,
  GridToolbarContainer,
  GridActionsCellItem,
} from '@mui/x-data-grid-pro';
import { useGridApiContext } from '@mui/x-data-grid';

import './table.scss'

export default function Table() {
  
  const dispatch = useDispatch();
  const {id} = useSelector(state => state.table);
  const {HOST} = useSelector(state => state.login)
  const {token} = useSelector(state => state.login);
  const {rows} = useSelector(state => state.table);
  const {loading} = useSelector(state => state.table);
  
  useEffect(() => {
    console.log('use dispatch')
    dispatch(fetchData({url: `${HOST}/ru/data/v3/testmethods/docs/userdocs/get`, personalToken: token}));
}, [])

  const [rowModesModel, setRowModesModel] = useState({});

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    dispatch(fetchDeleteData({url: `${HOST}/ru/data/v3/testmethods/docs/userdocs/delete/${id}`, personalToken: token}))
    dispatch(rowDeleted(id));
  };

  const handleCancelClick = (id) => () => {
    dispatch(onCancelRow())
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    
    if (!id.includes(updatedRow.id)){
      dispatch(fetchAddData({ url: `${HOST}/ru/data/v3/testmethods/docs/userdocs/create`, compSigDate: updatedRow.companySigDate,
      compSignName: updatedRow.companySignatureName, docName: updatedRow.documentName, docStatus: updatedRow.documentStatus, docType: updatedRow.documentType, 
      empNum: updatedRow.employeeNumber, empSigDate: updatedRow.employeeSigDate,
      empSigName: updatedRow.employeeSignatureName, personalToken: token}))
    } else {
      dispatch(fetchEditData({ url: `${HOST}/ru/data/v3/testmethods/docs/userdocs/set/${updatedRow.id}`, compSigDate: updatedRow.companySigDate,
      compSignName: updatedRow.companySignatureName, docName: updatedRow.documentName, docStatus: updatedRow.documentStatus, docType: updatedRow.documentType, 
      empNum: updatedRow.employeeNumber, empSigDate: updatedRow.employeeSigDate,
      empSigName: updatedRow.employeeSignatureName, personalToken: token}))
    }
   
    return updatedRow;
  };
  
  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  
  function EditToolbar(props) {
    const { setRowModesModel } = props;
  
    const handleClick = (id, params) => {
      dispatch(rowAdded({id, documentStatus: '', employeeNumber: '', documentType: '', documentName: '', companySignatureName: '', 
      employeeSigDate: '', companySigDate: '',})) 
      setRowModesModel((oldModel) => ({
        ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'documentStatus',},
      }));

    };
  
    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add record
        </Button>
      </GridToolbarContainer>
    );
  }
  
  EditToolbar.propTypes = {
    setRowModesModel: PropTypes.func.isRequired,
  };

  function CustomEditComponent(props) {
    const { id, value, field } = props;
    const apiRef = useGridApiContext();
  
    const handleValueChange = (event) => {
      const newValue = event.target.value;
      apiRef.current.setEditCellValue({ id, field, value: newValue });
    };
  
    return <input type="datetime-local" value={value} onChange={handleValueChange} />;
  }
 
  const columns = [
    { field: 'id', headerName: 'ID', width: 70, editable: true },
    { field: 'documentStatus', headerName: 'documentStatus', width: 130, editable: true,},
    { field: 'employeeNumber', headerName: 'employeeNumber', type: 'number', width: 100, editable: true},
    { field: 'documentType', headerName: 'documentType', width: 130, editable: true },
    { field: 'documentName', headerName: 'documentName', width: 130, editable: true },
    { field: 'companySignatureName', headerName: 'companySignatureName', width: 150, editable: true },
    { field: 'employeeSignatureName', headerName: 'employeeSignatureName', width: 150, editable: true },
    { field: 'employeeSigDate', headerName: 'employeeSigDate',  width: 200, renderEditCell: (params) => (
      <CustomEditComponent {...params} />
    ),
    editable: true },
    { field: 'companySigDate', headerName: 'companySigDate', width: 200, renderEditCell: (params) => (
      <CustomEditComponent {...params} />
    ), editable: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  
  
  return (
    <Box
      sx={{
        height: 500,
        width: '71%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      

      {(loading === 'true') ? 
      <Box sx={{ display: 'flex', 'justify-content': 'center', 'align-items': 'center'}}>
        <CircularProgress />
      </Box>   
      : <DataGridPro
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: {  setRowModesModel },
          }}
        /> }
    </Box>
  );
}