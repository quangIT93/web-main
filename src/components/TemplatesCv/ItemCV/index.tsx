import React from 'react';

interface PropsItemCV {
  title: string;
  content: string;
}

const ItemCV: React.FC<PropsItemCV> = (props) => {
  return (
    <div className="itemCV">
      <h3>{props.title}</h3>
      <p>{props.content}</p>
    </div>
  );
};

export default ItemCV;
