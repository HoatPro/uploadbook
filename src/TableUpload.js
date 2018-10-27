import React from 'react';
import { Table, Button } from 'antd';
class TableUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content:''
        };
    }
    handleFooter = () => {
        return <Button type="primary">Xác nhận</Button>;
    };
    componentWillReceiveProps(nextProps) {
        this.setState({
          title: nextProps.chapters.chapters[0].title,
            content: nextProps.chapters.chapters[0].content
        });
        console.log(nextProps.chapters.chapters[0].title);
    }
    getColumns = () => {
        const columns = [
            {
                title: 'CHƯƠNG',
                dataIndex: 'title',
                key: 'title',
                width: '30%',
            },
            {
                title: 'NỘI DUNG SÁCH',
                dataIndex: 'content',
                key: 'content',
                width: '30%',
            }
        ]
        return columns;
    }
    render() {

        return (
            <Table
                // dataSource={chapters}
                columns={this.getColumns()}
                bordered={true}
                pagination={false}
                scroll={{ y: 320 }}
                rowKey={record => record.chapter}
                footer={this.handleFooter}
            />
        );
    }
}

export default TableUpload;
