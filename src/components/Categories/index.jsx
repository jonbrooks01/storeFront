import { FormControl, Tab, Tabs } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import categorySlice from '../../store/active-category';

// const menuItems = [
//   { label: 'All', value: 'all' },
//   { label: 'Electronics', value: 'electronics' },
//   { label: 'Food', value: 'food' },
//   { label: 'Clothing', value: 'clothing' },
// ];

const Categories = () => {
  const dispatch = useDispatch();
  const activeCategory = useSelector((state) => state.category.activeCategory);

  const uniqueCategory = useSelector((state) => state.category.categories);

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
          <Tab key="all" label="All" value="all" />
          {uniqueCategory.map((category) => (
            <Tab
              key={category._id}
              label={category.name}
              value={category._id}
            />
          ))}
        </Tabs>
      </FormControl>
    </div>
  );
};

export default Categories;
