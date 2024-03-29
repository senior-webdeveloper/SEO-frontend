const initState = {
  loading: false,
  data: null,
  countries: null,
  sectorOne: null,
  sectorTwo: null,
  links: null,
  title: null,
  apiRoute: null,
  page: 1,
};

const currentAuthReducer = (state = initState, action) => {
  switch (action.type) {
    case "UPDATE_LOADING":
      return { ...state, loading: action.payload };
    case "UPDATE_APIROUTE":
      return { ...state, apiRoute: action.payload };
    case "UPDATE_TITLE":
      return { ...state, title: action.payload };
    case "UPDATE_DATA":
      return { ...state, data: action.payload };
    case "UPDATE_COUNTRIES":
      return { ...state, countries: action.payload };
    case "UPDATE_SECTOR_ONE":
      return { ...state, sectorOne: action.payload };
    case "UPDATE_SECTOR_TWO":
      return { ...state, sectorTwo: action.payload };
    case "UPDATE_LINKS":
      return { ...state, links: action.payload };
    case "UPDATE_PAGE":
      return { ...state, page: action.payload };

    default:
      return state;
  }
};

export default currentAuthReducer;
