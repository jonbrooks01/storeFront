import { FormControl, Tab, Tabs } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import categorySlice from '../../store/active-category';
import React from 'react';

const menuItems = [
  { label: 'All', value: 'all' },
  { label: 'Electronics', value: 'electronics' },
  { label: 'Food', value: 'food' },
  { label: 'Clothing', value: 'clothing' },
];

const Categories = () => {
  const dispatch = useDispatch();
  const activeCategory = useSelector((state) => state.category.activeCategory);

  const handleChange = (e, newValue) => {
    dispatch(categorySlice.actions.setActiveCategory(newValue));
  };

  return (
    <div style={{ width: '100%' }}>
      <FormControl fullWidth>
        <Tabs
          value={activeCategory || 'all'}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="Category Tabs"
          centered
        >
          {menuItems.map((item) => (
            <Tab key={item.value} label={item.label} value={item.value} />
          ))}
        </Tabs>
      </FormControl>
    </div>
  );
};

export default Categories;
