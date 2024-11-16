import { Card, Text } from "../../components";

export default function Report() {
  return (
    <div className="report-page">
      <Card>
        <Text.H1>Report</Text.H1>
      </Card>
      <Card>
        <Card.Header>
          <Text.H2>Yearly Transactions</Text.H2>
        </Card.Header>
        <Card.Body>
          <div id="year-transactions-chart"></div>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>
          <Text.H2>Monthly Transactions</Text.H2>
        </Card.Header>
        <Card.Body>
          <div id="monthly-transactions-chart"></div>
        </Card.Body>
      </Card>
    </div>
  );
}
