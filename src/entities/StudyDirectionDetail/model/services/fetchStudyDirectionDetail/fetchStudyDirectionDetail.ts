import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { StudyDirectionDetailType } from 'entities/StudyDirectionDetail/model/types/studyDirectionDetail';
import { editStudyDirectionActions } from 'features/StudyDirections/EditStudyDirection';

export const fetchStudyDirectionDetail = createAsyncThunk<StudyDirectionDetailType, string, ThunkConfig<string>>(
    'studyDirections/fetchStudyDirectionDetail',
    async (id, thunkAPI) => {
        const { rejectWithValue, extra, dispatch } = thunkAPI;

        try {
            const response = await extra.api.get<StudyDirectionDetailType>(`/college/study-directions/${id}`);

            dispatch(editStudyDirectionActions.setStudyDirectionData(response.data));

            return response.data;
        } catch (err: any) {
            return rejectWithValue('ERROR');
        }
    },
);
