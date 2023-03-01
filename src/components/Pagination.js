import React from 'react'
import Chip from "@mui/material/Chip";
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';

const Pagination = ({ usersPerPage, totalUsers, paginate, currentPage }) => {
    const pageNumbers = []
    // console.log(usersPerPage, totalUsers);
    for(let i = 1; i <= Math.ceil(totalUsers/usersPerPage); i++){
        pageNumbers.push(i)
    }

  return (
    <>
      <Chip
        label={<KeyboardDoubleArrowLeftOutlinedIcon />}
        onClick={() => paginate(1)}
      />
      <Chip
        label={<NavigateBeforeOutlinedIcon />}
        onClick={() => paginate(currentPage - 1)}
      />
      {pageNumbers.map((number) => (
        <Chip
          label={number}
          color={"primary"}
          variant={currentPage === number ? "outlined" : "filled"}
          onClick={() => paginate(number)}
        />
      ))}
      <Chip
        label={<NavigateNextOutlinedIcon />}
        onClick={() => paginate(currentPage + 1)}
      />
      <Chip
        label={<KeyboardDoubleArrowRightOutlinedIcon />}
        onClick={() => paginate(pageNumbers.length)}
      />
    </>
  );
}

export default Pagination
