import React, { useState, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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
import { data } from "./mocks/data";
import TrelloList from "./components/TrelloList";

// components
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
  const [trello, setTrello] = useState(data);

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

 
  const onDragEnd = (event) => {
    // the only one that is required
    console.log('onDragEnd', event);
    const { source, destination, type } = event;
    
    if(!destination) return;

    // drag & drop list
    if(type === 'LIST') {
      setTrello(prevState => {
        const newColumnOrder = [...prevState.columns]
        const listSpiced = newColumnOrder.splice(source.index, 1); 
        newColumnOrder.splice(destination.index, 0, ...listSpiced);
        return {
          ...prevState,
          columns: newColumnOrder
        }
      })
      return;
    }

    // drag & drop card same list
    if(source.droppableId === destination.droppableId) {

      return;
    }

     // drag & drop card difference list
    // ???
  }

  console.log('trello: ', trello)

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
          <Droppable droppableId="lists" direction="horizontal" type="LIST">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                // style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
                {...provided.droppableProps}
                className="listContainer"
              >
                {trello.columns.map((listId, listIndex) => {
                  const listItem = trello.lists[listId];
                  const cards = listItem.cards.map(cardId => trello.cards[cardId])

                  return (
                    <TrelloList
                      key={listId}
                      index={listIndex}
                      cards={cards}
                      listItem={listItem}
                    />
                  )
                })}
                
                {provided.placeholder}
                <Button type="text">
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
