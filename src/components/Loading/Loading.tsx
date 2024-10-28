import { Spin, Typography } from "antd";
const { Text } = Typography;

export default function Loading() {
  return (
    <>
      <Spin />
      <Text>Loading...</Text>
    </>
  );
}
