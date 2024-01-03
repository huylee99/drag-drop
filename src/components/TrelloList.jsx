import React from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// ant core
import {
  Card,
  Tooltip,
  Button,
  Popconfirm,
} from "antd";

// ant icons
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

import SimpleCard from "./SimpleCard";


function TrelloList({ index, listItem, cards}) {
  return (
    <Draggable draggableId={listItem.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="todoList"
        >
          <Droppable droppableId={listItem.id.toString()} type="CARD">
            {(provided, snapshot) => (
              <Card
                title={listItem.name}
                className="cardList"
                extra={
                  <>
                    <Tooltip title="Add a card">
                      <Button
                        shape="circle"
                        icon={<PlusOutlined />}
                        onClick={() => setOpen(true)}
                      />
                    </Tooltip>
    
                    <Popconfirm
                      title="Delete the list"
                      description="Are you sure to delete this list?"
                      onConfirm={() => {}}
                      onCancel={() => {}}
                      okText="Yes"
                      cancelText="No"
                      className="ml-10"
                    >
                      <Tooltip title="Delete this list">
                        <Button
                          shape="circle"
                          icon={<DeleteOutlined />}
                        />
                      </Tooltip>
                    </Popconfirm>
                  </>
                }
              >
                <div
                  ref={provided.innerRef}
                  // style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
                  {...provided.droppableProps}
                >
                  {cards.map((cardItem, cardIndex) => {
                    return (
                      <React.Fragment key={cardItem.id}>
                        <Draggable draggableId={cardItem.id.toString()} index={cardIndex}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="card"
                            >
                              <SimpleCard
                                cardItem={cardItem}
                              />
                            </div>
                          )}
                        </Draggable>
                      </React.Fragment>
                    )
                  })}
                  {provided.placeholder}
                </div>
              </Card>
            )}
          </Droppable>
          
        </div>
      )}
    </Draggable>
    
  )
}

export default TrelloList