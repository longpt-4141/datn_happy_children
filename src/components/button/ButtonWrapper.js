import React from 'react';
import { Button } from 'antd';
const ButtonWrapper = ({children}) => {
    return (
        <Button 
            type="primary" 
            htmlType="submit"
            
        >
            {children}
        </Button>
    );
}

export default ButtonWrapper;
