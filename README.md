Application Overview

The application fetches data from the Rick and Morty API and displays a list of characters. It includes a search feature that filters characters based on user input and supports pagination to display a limited number of characters per page. The application consists of the main App component and a CreateCharacters component to render individual character details.

Fetching Data

When the App component mounts, the useEffect hook calls fetchAllData to fetch all characters from the API. The data is stored in the allCharacters state variable.

State Management

The application uses several state variables to manage different aspects of the UI:
allCharacters: Stores the entire list of characters.
[start, end]: Tracks the current range of characters to display for pagination.
inputValue: Stores the user's search input.

Search and Pagination

Search: The characterInput function updates inputValue as the user types. The list of characters is filtered based on inputValue.
Pagination: The goToNextPage and goToPrevPage functions update the [start, end] range to show the next or previous set of characters.
Rendering Characters:

The application conditionally renders characters based on the search input and pagination. It uses the charactersToDisplay variable to determine which characters to render. This variable is calculated by slicing the allCharacters array or the filtered results based on the current start and end range.
