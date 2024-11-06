import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Box, Divider, Paper, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { CategorySectionListProps, Subcategory } from '../Types/allTypes';

const CategorySectionList: React.FC<CategorySectionListProps> = ({ checked, setChecked, filteredCategory, categoryData }) => {
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleToggleCategory = (categoryId: string) => () => {
    setOpenCategories((prev) => {
      const isCurrentlyOpen = prev.includes(categoryId);
      return isCurrentlyOpen
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId];
    });
  };

  const handleToggleCategoryCheckbox = (categoryId: string, subcategories: Subcategory[]) => () => {
    const isChecked = checked.includes(categoryId);

    if (isChecked) {
      
        const newChecked = (prev: string[]) => prev.filter(id => id !== categoryId && !subcategories.some(sub => sub._id === id))

        setChecked(newChecked(checked));
    } else {
      // Check the parent category and all its subcategories

      const newChecked = (prev: string[]) => [
        ...prev,
        categoryId,
        ...subcategories.map(subcategory => subcategory._id),
      ];
      setChecked(newChecked(checked));
    }
  };

  const isChecked = (value: string) => checked.includes(value);

  useEffect(() => {
    if (filteredCategory) {
      handleToggleCategoryCheckbox(filteredCategory._id, filteredCategory.subcategories)();
    }
  }, [filteredCategory]);

  return (
    <Paper elevation={3}>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <ListItem>
          <Typography variant='h6' sx={{ fontWeight: 'bolder' }}>Categories</Typography>
        </ListItem>
        <Divider />
        {categoryData.map((category) => {
          const { _id: categoryId, name: categoryName, subcategories } = category;
          const isCategoryOpen = openCategories.includes(categoryId);
          const isCategoryChecked = isChecked(categoryId);

          return (
            <React.Fragment key={categoryId}>
              <ListItem>
                <ListItemButton onClick={handleToggleCategory(categoryId)}>
                  <Checkbox
                    edge="start"
                    checked={isCategoryChecked}
                    tabIndex={-1}
                    disableRipple
                    onClick={handleToggleCategoryCheckbox(categoryId, subcategories)}
                  />
                  <ListItemText primary={categoryName} />
                  {isCategoryOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItemButton>
              </ListItem>
              {isCategoryOpen && subcategories && (
                <Box sx={{ pl: 4 }}>
                  {subcategories.map((subcategory) => {
                    const { _id: subcategoryId, name: subCategoryName } = subcategory;
                    return (
                      <ListItem key={subcategoryId}>
                        <ListItemButton
                          onClick={handleToggle(subcategoryId)}
                          sx={{ backgroundColor: isChecked(subcategoryId) ? 'lightGrey' : 'transparent' }}
                        >
                          <Checkbox
                            edge="start"
                            checked={isChecked(subcategoryId)}
                            tabIndex={-1}
                            disableRipple
                          />
                          <ListItemText primary={subCategoryName} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </Box>
              )}
            </React.Fragment>
          );
        })}
      </List>
    </Paper>
  );
};

export default CategorySectionList;
