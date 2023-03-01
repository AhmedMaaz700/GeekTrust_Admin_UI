import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import CustomPagination from "./Pagination";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editable, setEditable] = useState(false);
  const [checkedRows, setCheckedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ usersPerPage ] = useState(10);
  
  const indexOfLastPost = currentPage * usersPerPage;
  const indexOfFirstPost = indexOfLastPost - usersPerPage;
  const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost)

  const columns = [
    { field: null, headerName: <strong>ID</strong>, width: 252 },
    {
      field: "name",
      editable: editable,
      headerName: <strong>Name</strong>,
      width: 252,
    },
    {
      field: "email",
      editable: editable,
      headerName: <strong>Email</strong>,
      width: 252,
    },
    {
      field: "role",
      editable: editable,
      headerName: <strong>Role</strong>,
      width: 252,
    },
    {
      field: "actions",
      headerName: <strong>Actions</strong>,
      width: 252,
      renderCell: (params) => {
        return (
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
            <BorderColorOutlinedIcon onClick={() => setEditable(!editable)} />
            <DeleteOutlineIcon
              sx={{ color: "#f26096", marginLeft: 2 }}
              onClick={() => deleteRow(params.row.id)}
            />
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      const res = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      console.log(res.data);
      setUsers(res.data);
      setResponse(res.data);
      setLoading(false);
    };
    getUsers();
  }, []);

  const checkboxSelection = (rowId) => {
    setCheckedRows(rowId)
    console.log(rowId);
  }

  const deleteRow = (rowID) => {
    let newUsers = [...users].filter((item) => rowID !==item.id)
    setUsers(newUsers)
    setResponse(newUsers)
  }

  const deleteSelected = () => {
    let tempUsers = [...users]
    let newUsers = tempUsers.filter((item) => !checkedRows.includes(item.id))
    setUsers(newUsers)
    setResponse(newUsers)
  }


  const paginate = (number) => {
    setCurrentPage(number)
  }
  
  const searchUsers = (event) => {
      let result = filterUsers(response, event.target.value, ['name', 'email', 'role'])
      setUsers(result)
  };

  const filterUsers = (array, search, keys) => {
    var lowSearch = search.toLowerCase();
    return array.filter((data) =>
      keys.some((key) => String(data[key]).toLowerCase().includes(lowSearch))
    );
  }

  return (
    <div>
      <Grid container>
        <Grid item xs={0.5}></Grid>
        <Grid item xs={11} p={3}>
          <Grid >   
            <TextField
              sx={{ marginBottom: '20px' }}
              fullWidth
              size="small"
              placeholder="Search by name, email or role"
              name="search"
              onChange={(event) => searchUsers(event)}
            />
            {loading ? (
              <h2>Loading...</h2>
            ) : (
              <Grid>
                <div style={{ height: 600, width: "100%" }}>
                  <DataGrid
                    rows={currentPosts}
                    columns={columns}
                    pageSize={usersPerPage}
                    onSelectionModelChange={checkboxSelection}
                    checkboxSelection
                    hideFooter={true}
                  />
                </div>
                <Grid
                  direction="row"
                  display={'flex'}
                  justifyContent="center"
                  spacing={2}
                  marginTop="10px"
                >
                  <Chip
                    label="Delete Selected"
                    sx={{ backgroundColor: "#f26096", color: "white" }}
                    onClick={deleteSelected}
                  />
                  <CustomPagination
                    usersPerPage={usersPerPage}
                    totalUsers={users.length}
                    paginate={paginate}
                    currentPage={currentPage}
                  />
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>       
        <Grid item xs={0.5}></Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;