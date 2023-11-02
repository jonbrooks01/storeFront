import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
// import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
// import categorySlice from '../../store/active-category';
import categorySlice from '../../store/active-category';

const Categories = () => {
  const dispatch = useDispatch();
  const activeCategory = useSelector((state) => state.category.activeCategory);

  const handleChange = (e) => {
    dispatch(categorySlice.actions.setActiveCategory(e.target.value));
  };
  return (
    <div style={{ width: '250px' }}>
      <FormControl fullWidth>
        <InputLabel id="category">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          value={activeCategory || 'all'}
          label="category"
          onChange={handleChange}
        >
          <MenuItem value={'all'}>All</MenuItem>
          <MenuItem value={'electronics'}>Electronics</MenuItem>
          <MenuItem value={'food'}>Food</MenuItem>
          <MenuItem value={'clothing'}>Clothing</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Categories;
