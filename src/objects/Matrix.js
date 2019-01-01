import UUIDGen from 'uuid/v1';

class Matrix {
  constructor(data, properties) {
    this.data = data;
    this.rows = data ? data.length : 0;
    this.columns = data && data[0] ? data[0].length : 0;
    this.invalid = false;
    this.id = parseInt(UUIDGen(), 16);
    this.type = properties.type;
  }

  getProperties() {
    return {
      type: this.type,
    };
  }
}

export default Matrix;
