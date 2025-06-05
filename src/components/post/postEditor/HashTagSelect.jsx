import { Autocomplete, TextField } from '@mui/material';
import React from 'react';

const HashTagSelect = ({
  hashtagSuggestions,
  hashtagsLoading,
  hashtags,
  setHashtags,
  setHashtagQuery,
}) => {
  return (
    <Autocomplete
      multiple
      options={hashtagSuggestions}
      getOptionLabel={(option) => option.tag || option}
      value={hashtags}
      onChange={(_, value) => {
        const normalizedValue = value.map((item) =>
          typeof item === 'string' ? { tag: item.replace(/^#/, '') } : item,
        );
        setHashtags(normalizedValue);
      }}
      onInputChange={(_, value) => setHashtagQuery(value.replace(/^#/, ''))}
      renderInput={(params) => (
        <TextField {...params} label="hashtags" placeholder="Add hashtags" />
      )}
      loading={hashtagsLoading}
      sx={{ mb: 2 }}
      freeSolo
      filterOptions={(options, { inputValue }) => {
        const cleanedInput = inputValue.replace(/^#/, '').toLowerCase();
        const filtered = options.filter((option) =>
          option.tag.toLowerCase().includes(cleanedInput),
        );
        if (cleanedInput && !filtered.some((option) => option.tag.toLowerCase() === cleanedInput)) {
          filtered.push({ tag: cleanedInput });
        }
        return filtered;
      }}
    />
  );
};

export default HashTagSelect;
