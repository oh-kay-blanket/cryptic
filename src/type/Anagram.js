import React from 'react';

const Anagram = ({ }) => {

  const recordList = data.map((record, index) => (<RecordCell key={record.id} index={index} record={record} handleRecordClick={handleRecordClick} />));

  return(
    <div id='record-grid' className='record-grid'>
      {recordList}
    </div>
  )
}

export default Anagram;