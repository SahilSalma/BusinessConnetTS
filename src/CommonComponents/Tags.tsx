import React, { useState } from 'react';
import { Chip, Box, TextField } from '@mui/material';
import { MultiSelectTagsProps } from '../Types/allTypes';

const MultiSelectTags: React.FC<MultiSelectTagsProps> = ({ options, selectedTags, handleTagClick }) => {
  const [search, setSearch] = useState('');

  // Filter options based on search input
  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {filteredOptions.map((option) => (
          <Chip
            key={option}
            label={option}
            onClick={() => handleTagClick(option)}
            variant={selectedTags.includes(option) ? 'filled' : 'outlined'}
            color={selectedTags.includes(option) ? 'primary' : 'default'}
            sx={{
              cursor: 'pointer',
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default MultiSelectTags;
