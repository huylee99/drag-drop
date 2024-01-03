import React from "react";
import {
  Card,
  Avatar,
  Tooltip,
  Popconfirm,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  AntDesignOutlined,
  UserOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

function SimpleCard({ cardItem }) {
  return (
    <Card
      className="cardItem"
      cover={<img alt="example" src="https://picsum.photos/265/160" />}
      actions={[
        <Tooltip title="View">
          <FileTextOutlined key="view" />
        </Tooltip>,
        <Tooltip title="Edit">
          <EditOutlined key="edit" />
        </Tooltip>,
        <Popconfirm
          title="Delete the card"
          description="Are you sure to delete this card?"
          onConfirm={() => {}}
          onCancel={() => {}}
          okText="Yes"
          cancelText="No"
          className="ml-10"
        >
          <Tooltip title="Delete">
            <DeleteOutlined key="ellipsis" />
          </Tooltip>
        </Popconfirm>,
      ]}
    >
      <Meta
        title={cardItem.name}
        description={
          <>
            <div>{cardItem.description}</div>
          </>
        }
      />
    </Card>
  );
}

export default SimpleCard;
