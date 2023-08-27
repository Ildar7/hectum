import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AddStudyDirectionErrors, AddStudyDirectionType } from 'features/StudyDirections/AddStudyDirection';
import { fetchStudyDirections } from 'entities/StudyDirections/model/services/fetchStudyDirections/fetchStudyDirections';
import { getAddStudyDirectionTitle } from '../../selectors/getAddStudyDirectionTitle/getAddStudyDirectionTitle';
import { addStudyDirectionActions } from '../../slice/addStudyDirectionSlice';

export const addStudyDirection = createAsyncThunk<AddStudyDirectionType, void, ThunkConfig<AddStudyDirectionErrors>>(
    'studyDirections/addStudyDirection',
    async (_, thunkAPI) => {
        const {
            rejectWithValue, extra, dispatch, getState,
        } = thunkAPI;

        const addStudyDirectionTitle = getAddStudyDirectionTitle(getState() as any);

        const data = {
            name: addStudyDirectionTitle,
        };

        try {
            const response = await extra.api.post<AddStudyDirectionType>('/college/study-directions/', data);

            dispatch(fetchStudyDirections());
            dispatch(addStudyDirectionActions.clearData());

            return response.data;
        } catch (err: any) {
            return rejectWithValue({
                errors: err.response.data.errors,
                status: err.response.status,
            });
        }
    },
);
