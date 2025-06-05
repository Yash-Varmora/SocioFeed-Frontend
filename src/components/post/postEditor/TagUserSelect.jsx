import { Autocomplete, TextField } from '@mui/material';
import React from 'react';

const TagUserSelect = ({ users, loading, taggedUsers, setTaggedUsers, setSearchQuery }) => {
  return (
    <Autocomplete
      multiple
      options={users}
      getOptionLabel={(option) => option.username}
      value={taggedUsers}
      onChange={(_, value) => setTaggedUsers(value)}
      onInputChange={(_, value) => setSearchQuery(value)}
      renderInput={(params) => (
        <TextField {...params} label="Tag friends" placeholder="Search users" />
      )}
      loading={loading}
      sx={{ mb: 2 }}
    />
  );
};

export default TagUserSelect;
