import { useState } from "react";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

// ant core
import {
  Avatar,
  Button,
  Modal,
  Input,
  Form,
  Select,
} from "antd";

// ant icons
import { PlusOutlined } from "@ant-design/icons";

// components
import TrelloList from "./components/TrelloList";
import { data } from "./mocks/data";

const { TextArea } = Input;
const { Option } = Select;

const options = [];
for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}

function App() {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [todos, setTodos] = useState(data)

  // using useCallback is optional
  const onDragEnd = (data) => {
    // the only one that is required
    console.log("onDragEnd", data)

    const { source, destination, type } = data;

    if(!destination) return;

    // drag & drop LIST
    if(type === 'LIST') {
      const clonedColumns = [...todos.columns];
      const columnRemove = clonedColumns.splice(source.index, 1)[0];
      clonedColumns.splice(destination.index, 0, columnRemove);

      setTodos(prevState => ({
        ...prevState,
        columns: clonedColumns
      }))
      return;
    }

    // card
    // drag & drop card in same list
    if(source.droppableId === destination.droppableId) {
      const clonedCards = [...todos.lists[source.droppableId].cards];
      const itemRemoved = clonedCards.splice(source.index, 1)[0];
      clonedCards.splice(destination.index, 0, itemRemoved);
      setTodos(prevState => {
        return {
          ...prevState,
          lists: {
            ...prevState.lists,
            [source.droppableId]: {
              ...prevState.lists[source.droppableId],
              cards: clonedCards
            }
          }
        }
      })

      return
    }

     // drag & drop card in difference list
  }

  function handleAddList() {
    const listItem = {
      id: `List${Date.now()}`,
      name: `List 1 ${Date.now()}`,
      cards: []
    }
    setTodos(prevState => {
      return {
        ...prevState,
        columns: [...prevState.columns, listItem.id],
        lists: {
          ...prevState.lists,
          [listItem.id]: listItem
        }
      }
    })
  }

  const handleSubmit = (values) => {
    console.log("values: ", values);

    setConfirmLoading(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  console.log('todos: ', todos)

  return (
    <>
      <header>
        <div className="header__container">
          <div className="header__logo" />
          <div className="header__right">
            <div className="header__avatar">
              <img src="/assets/images/avatar.png" alt="Avatar" />
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="container flex mt-2 px-2">
        <DragDropContext
          onDragEnd={onDragEnd}
        >
          <Droppable droppableId="all-lists" direction="horizontal" type="LIST">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                // style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
                {...provided.droppableProps}
                className="listContainer"
              >
                {todos.columns.map((listId, listIndex) => {
                  const listItem = todos.lists[listId];
                  const cards = listItem.cards.map(cardId => todos.cards[cardId]);

                  return (
                    <TrelloList 
                      key={listItem.id}
                      index={listIndex}
                      listItem={listItem}
                      cards={cards}
                    />
                  )
                })}
        
                {provided.placeholder}
                <Button type="text" onClick={handleAddList}>
                  <PlusOutlined /> Add another list
                </Button>
              </div>
            )}
          </Droppable>
        </DragDropContext>
         
        </div>
      </main>

      <Modal
        title="Add Card"
        open={open}
        onOk={form.submit}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
      >
        <br />
        <Form
          name="basic"
          form={form}
          initialValues={{ status: "new" }}
          onFinish={handleSubmit}
          autoComplete="off"
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          wrapperCol={{ flex: 1 }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input your title!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input your description!" },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Member"
            name="member"
            rules={[
              { required: true, message: "Please input your description!" },
            ]}
          >
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select"
              optionLabelProp="label"
              onChange={handleChange}
            >
              <Option value="tony123" label="tony 123">
                <div className="selectField">
                  <Avatar src="https://picsum.photos/id/237/200/300" />
                  <span>Tony Nguyen</span>
                </div>
              </Option>
              <Option value="phuong123" label="phuong 123">
                <div className="selectField">
                  <Avatar src="https://picsum.photos/id/237/200/300" />
                  <span>Phuong Nguyen</span>
                </div>
              </Option>
            </Select>
          </Form.Item>

          <Form.Item label="Status" name="status">
            <Select
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                {
                  value: "new",
                  label: "New",
                },
                {
                  value: "inprocess",
                  label: "In process",
                },
                {
                  value: "done",
                  label: "Done",
                },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default App;
