import { Button, Card,Typography } from 'antd';
const { Meta } = Card;
const { Text } = Typography;
import { FieldTimeOutlined } from '@ant-design/icons';
const EventCard = ({title,description,capacity,registered,id,date}) => (
  <Card
    hoverable
    // style={{
    //   width: 200,
    // }}
    actions={[
      <Text key={'capacity'}>
          <p style={{margin:0,padding:0}}>Total Capacity</p>
          <b>{capacity}</b>
      </Text>,
      <Text key={'registered'}>
          <p style={{margin:0,padding:0}}>Registered</p>
          <b>{registered}</b>
      </Text>,
    ]}
    cover={
      <img alt="example" 
          src="https://ollyo.com/wp-content/uploads/2024/06/ollyocon-blog-2024-1536x950.webp" />}>
      <Meta
        title={title}
        // description={<FieldTimeOutlined /> + " " + date} 
      />
      {<FieldTimeOutlined />} {date}
  </Card>
);
export default EventCard;