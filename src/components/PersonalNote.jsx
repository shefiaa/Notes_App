import React from 'react';
import Navbar from './Navbar';
import FormInput from './FormInput';
import BodySection from './BodySection';

class PersonalNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: [],
      search: '',
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onAddDatasHandler = this.onAddDatasHandler.bind(this);
    this.onActiveHandler = this.onActiveHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onSearchHandler = this.onSearchHandler.bind(this);
  }

  onDeleteHandler(id) {
    const updatedDatas = this.state.datas.filter(data => data.id !== id);
    this.setState({ datas: updatedDatas });
  }

  onSearchHandler(event) {
    this.setState({ search: event.target.value.toLowerCase() });
  }

  onActiveHandler(id) {
    const updatedDatas = this.state.datas.map(data => {
      if (data.id === id) {
        data.archived = true;
      }
      return data;
    });
    this.setState({ datas: updatedDatas });
  }

  onArchiveHandler(id) {
    const updatedDatas = this.state.datas.map(data => {
      if (data.id === id) {
        data.archived = !data.archived; 
      }
      return data;
    });
    this.setState({ datas: updatedDatas });
  }
  
  

  onAddDatasHandler({ title, body }) {
    const newNote = {
      id: +new Date(),
      title,
      body,
      createdAt: new Date().toDateString(),
      archived: false,
    };
    this.setState(prevState => ({
      datas: [...prevState.datas, newNote],
    }));
  }

  render() {
    const filteredDatas = this.state.datas.filter(data =>
      data.title.toLowerCase().includes(this.state.search)
    );

    const activeDatas = filteredDatas.filter(data => !data.archived);
    const archiveDatas = filteredDatas.filter(data => data.archived);

    return (
      <div className="bg-gray-900 min-h-screen text-white">
        <Navbar onSearch={this.onSearchHandler} />
        <FormInput addDatas={this.onAddDatasHandler} />
        <BodySection
          onDelete={this.onDeleteHandler}
          onActive={this.onActiveHandler}
          onArchive={this.onArchiveHandler}
          activeDatas={activeDatas}
          archiveDatas={archiveDatas}
        />
      </div>
    );
  }
}

export default PersonalNote;
