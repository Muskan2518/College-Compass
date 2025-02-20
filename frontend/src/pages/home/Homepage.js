import React, { useReducer, useEffect } from 'react';
import { getAll, search, getAllTags } from '../../services/clgService'; // Adjust the path and imports as necessary
import Thumbnails from '../../components/Thumbnails/Thumbnails';
import { useParams } from 'react-router-dom';
import Search from '../../components/Search/Search';
import Tags from '../../components/Tags/Tags';
import NotFound from '../../components/NotFound/NotFound';

const initialState = {
  colleges: [],
  tags: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'COLLEGES_LOADED':
      return { ...state, colleges: action.payload };
    case 'TAGS_LOADED':
      return { ...state, tags: action.payload };
    default:
      return state;
  }
};

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { colleges, tags } = state;
  const { searchTerm, tag } = useParams();

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        let loadedColleges;
        if (searchTerm) {
          loadedColleges = await search(searchTerm);
        } else {
          loadedColleges = await getAll();
          if (tag) {
            loadedColleges = loadedColleges.filter(college => college.tags.includes(tag));
          }
        }
        dispatch({ type: 'COLLEGES_LOADED', payload: loadedColleges });
      } catch (error) {
        console.error('Error loading colleges:', error);
        // Handle error loading colleges if needed
      }
    };

    fetchColleges();
  }, [searchTerm, tag]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const loadedTags = await getAllTags();
        dispatch({ type: 'TAGS_LOADED', payload: loadedTags });
      } catch (error) {
        console.error('Error loading tags:', error);
        // Handle error loading tags if needed
      }
    };

    fetchTags();
  }, []);

  return (
    <div>
      <h1>HomePage</h1>
      <Search />
      <Tags tags={tags} />
      {colleges.length > 0 ? (
        <Thumbnails colleges={colleges} />
      ) : (
        <NotFound message="No colleges found." />
      )}
    </div>
  );
}
