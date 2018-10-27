import React from 'react';
import {  Button, Upload, message, Icon,Table} from 'antd';
import './App.css';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chapters: [],
      title: '',
      content: '',
      data:''
    };
  }
  getColumns = () => {
    const columns = [
      {
        title: 'CHƯƠNG',
        dataIndex: 'title',
        key: 'title',
        width: '20%',

      },
      {
        title: 'NỘI DUNG SÁCH',
        dataIndex: 'content',
        key: 'content',
        width: '80%',
      }
    ]
    return columns;
  }

  handleFooter = () => {
    return <Button type="primary">Xác nhận</Button>;
  };

  render() {
    const props = {
      name: "file",
      multiple: true,
      accept: ".DOCX, .DOC, .TXT",
      disabled: false,
      showUploadList: false,
      withCredentials: true,
      action: "http://localhost:8080/api/v1/books/upload-book-content",
      onChange: (info) => {
        const { status } = info.file;
        if (status === "done") {
          const { response } = info.file;
          // console.log(info);
          // console.log(response);
          if (response.status) {
            this.setState({
              chapters: response.results.chapters
            });
            message.success(`File ${info.file.name} upload thành công !`);
          } else {
            message.warning("Upload không đúng định dạng file!!");
          }
        } else if (status === "error") {
          message.error(`File ${info.file.name}  upload thất bại !!`);
        }
      }
    };
    const { chapters } = this.state;
    console.log(chapters);

    const data = [];
    chapters.map(chapter => {
      return data.push({
        key: `${chapter.orderNo}`,
        title: `Chương ${chapter.orderNo} : ${chapter.title}`,
        content: `${chapter.content}`
      });
    })

    return <div>
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> Upload
          </Button>
        </Upload>

      <Table

        dataSource={data}
        columns={this.getColumns()}
        bordered={true}
        pagination={false}
        scroll={{ y: 450}}
        rowKey={record => record.key}
        footer={this.handleFooter} />
      </div>;
  }
}
export default App;
