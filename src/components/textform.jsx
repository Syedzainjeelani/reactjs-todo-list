import React, { useState } from 'react'
import { TextField, Button, Box } from "@material-ui/core"

function TextForm(props) {
  const { addTodo, newTodo, update } = props;
  const [todoText, setTodoText] = useState("")
  var shouldAdd = (newTodo !== null && newTodo.index === -1)

  function submitItem(e) {

    if (todoText.length !== 0) {
      if (shouldAdd) {
        addTodo(todoText);
      } else {
        update(newTodo.oldTodo, todoText, newTodo.index)
        newTodo.index = -1;
      }
    }
    e.preventDefault();
    setTodoText("")
  }

  function updateTodo() {

    if (newTodo !== null && newTodo.todo !== "") {
      setTodoText(newTodo.todo)
      newTodo.todo = "";
    }

    return "Update";
  }

  return <React.Fragment>
    <form action="../../pages/api/todos" method="POST" noValidate autoComplete="off" onSubmit={submitItem}>
      <Box sx={{ px: 2, pt: 3, pb: 1, display: "flex", flexWrap: "nowrap", justifyContent: "center", bgcolor: "pink" }}>
        <Box sx={{
          width: "85%"
        }}>
          <TextField
            onChange={(e) => {
              const { value } = e.target;
              setTodoText(value)
            }}
            value={todoText}
            fullWidth={true}
            id="filled-tf"
            label="Enter Todo Item"
            variant="filled"
            name="TodoField"
            color="secondary" />
        </Box>
        <Box sx={{
          my: 1, ml: 2, width: "20%",
        }}>
          <Button size="large"
            variant="contained"
            fullWidth={true}
            type="submit">
            {shouldAdd ? "Add" : updateTodo()}
          </Button>
        </Box>
      </Box>
    </form>
  </React.Fragment>;
}

export default (TextForm);