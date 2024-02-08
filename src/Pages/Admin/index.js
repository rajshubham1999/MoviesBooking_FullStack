import React from "react";
import { Tabs } from "antd";
import PageTitle from "../../components/PageTitle.js";

 import MoviesList from "./MoviesList.js";
 import TheatresList from "./TheatresList.js";
// //  import UpcomingList from './UpcomingList'

function Admin() {
  return (
    <div>
      <PageTitle title="Admin" />

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Movies" key="1">
          <MoviesList/>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Theatres" key="2">
            <TheatresList/>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Admin;