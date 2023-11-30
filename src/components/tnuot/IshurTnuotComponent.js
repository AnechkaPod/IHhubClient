
import * as React from 'react';
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
    randomCreatedDate,
    randomTraderName,
    randomId,
    randomArrayItem,
} from '@mui/x-data-grid-generator';

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
    return randomArrayItem(roles);
};

const initialRows = [
    {
        id: randomId(),
        name: randomTraderName(),
        age: 25,
        joinDate: randomCreatedDate(),
        role: randomRole(),
    },
    {
        id: randomId(),
        name: randomTraderName(),
        age: 36,
        joinDate: randomCreatedDate(),
        role: randomRole(),
    },
    {
        id: randomId(),
        name: randomTraderName(),
        age: 19,
        joinDate: randomCreatedDate(),
        role: randomRole(),
    },
    {
        id: randomId(),
        name: randomTraderName(),
        age: 28,
        joinDate: randomCreatedDate(),
        role: randomRole(),
    },
    {
        id: randomId(),
        name: randomTraderName(),
        age: 23,
        joinDate: randomCreatedDate(),
        role: randomRole(),
    },
];


function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = randomId();
        setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    return (
        <GridToolbarContainer>
       {/*      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Add record
            </Button> */}
        </GridToolbarContainer>
    );
}
const IshurTnuotComponent = () => {

    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState({});
    const [openTnuaMeusheret, setOpenTnuaMeusheret] = React.useState(false);
    const [openTnuaLoMeusheret, setOpenTnuaLoMeusheret] = React.useState(false);
    
    const [rowsBeforeDelete, setrowsBeforeDelete] = React.useState([]);

    const handleUndo = (event) => {
        event.stopPropagation(); // Prevent the event from reaching the parent elements
        console.log("handleUndo");
        console.log("rowsBeforeDelete", rowsBeforeDelete);
        setRows(rowsBeforeDelete);
        setOpenTnuaMeusheret(false);
    };
    const handleCloseTnuaMeusheret = (event, reason) => {
        console.log("handleClose");
        if (reason === 'clickaway') {
            return;
        }

        setOpenTnuaMeusheret(false);
    };

    const handleCloseTnuaLoMeusheret = (event, reason) => {
        console.log("handleCloseTnuaLoMeusheret");
        if (reason === 'clickaway') {
            return;
        }

        setOpenTnuaLoMeusheret(false);
    };
    
    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };
    const handleCheckClick = (id) => () => {
        console.log("handleCheckClick");
        console.log("rows", rows);
        setrowsBeforeDelete(rows);
        setRows(rows.filter((row) => row.id !== id));
        setOpenTnuaMeusheret(true);
/*     setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
 */  };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => () => {
        setrowsBeforeDelete(rows);
        setRows(rows.filter((row) => row.id !== id));
        setOpenTnuaLoMeusheret(true);
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        { field: 'name', headerName: 'Name', width: 180, editable: true },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 80,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'joinDate',
            headerName: 'Join date',
            type: 'date',
            width: 180,
            editable: true,
        },
        {
            field: 'role',
            headerName: 'Department',
            width: 220,
            editable: true,
            type: 'singleSelect',
            valueOptions: ['Market', 'Finance', 'Development'],
        },
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
                            sx={{
                                color: 'primary.main',
                            }}
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
         /*        const action = (
                    <React.Fragment>
                        <Button color="secondary" size="small" onClick={handleUndo}>
                            UNDO
                        </Button>
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={handleClose}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                ); */
                return [
   /*                  <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    >

                    </GridActionsCellItem>
                    , */
                    <GridActionsCellItem
                        icon={<CheckIcon />}
                        label="אישור תנועה"
                        className="textPrimary"
                        onClick={handleCheckClick(id)}
                        color="inherit"
                    >

                    </GridActionsCellItem>
                    ,
                    <GridActionsCellItem
                        icon={<DoNotDisturbIcon />}
                        label="לא מאושר"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
        /*             <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={handleDeleteClick(id)}
                    color="inherit"
                />, */
                ];
            },
        },
    ];
    const actionLoMeushar = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleUndo}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseTnuaMeusheret}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    const actionMeushar = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleUndo}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseTnuaMeusheret}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div>TnuotComponent
            <Box
                sx={{
                    background: "white",
                    margin: '0 auto',  // Center the Box horizontally
                    height: '1000px',
                    width: '90%',
                    '& .actions': {
                        color: 'text.secondary',
                    },
                    '& .textPrimary': {
                        color: 'text.primary',
                    },
                }}
            >
                <DataGrid
                    sx={{ minHeight: '100%' }}
                    rows={rows}
                    columns={columns}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    slots={{
                        toolbar: EditToolbar,
                    }}
                    slotProps={{
                        toolbar: { setRows, setRowModesModel },
                    }}
                />
            </Box>
            <Snackbar
                open={openTnuaMeusheret}
                autoHideDuration={3000}
                onClose={handleCloseTnuaMeusheret}
                message="תנועה מאושרת"
                action={actionMeushar}
            />
            <Snackbar
                open={openTnuaLoMeusheret}
                autoHideDuration={3000}
                onClose={handleCloseTnuaLoMeusheret}
                message="תנועה לא מאושרת"
                action={actionLoMeushar}
            />
        </div>
    )
}

export default IshurTnuotComponent