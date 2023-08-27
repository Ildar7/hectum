import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { fetchCitizenship } from 'entities/Citizenship';
import { AddCitizenshipErrors, AddCitizenshipType } from '../../types/addCitizenship';
import { addCitizenshipActions } from '../../slice/addCitizenshipSlice';
import { getAddCitizenshipName } from '../../selectors/getAddCitizenshipName/getAddCitizenshipName';
import { getAddCitizenshipCountryId } from '../../selectors/getAddCitizenshipCountryId/getAddCitizenshipCountryId';

export const addCitizenship = createAsyncThunk<AddCitizenshipType, void, ThunkConfig<AddCitizenshipErrors>>(
    'citizenship/addCitizenship',
    async (_, thunkAPI) => {
        const {
            rejectWithValue, extra, dispatch, getState,
        } = thunkAPI;

        const addCitizenshipName = getAddCitizenshipName(getState() as any);
        const addCitizenshipCountryId = getAddCitizenshipCountryId(getState() as any);

        const data = {
            name: addCitizenshipName,
            country_id: addCitizenshipCountryId,
        };

        try {
            const response = await extra.api.post<AddCitizenshipType>('/college/citizenship/', data);

            dispatch(fetchCitizenship());
            dispatch(addCitizenshipActions.clearData());

            return response.data;
        } catch (err: any) {
            return rejectWithValue({
                errors: err.response.data.errors,
                status: err.response.status,
            });
        }
    },
);
