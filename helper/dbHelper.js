const mongoose = require('mongoose')
const { UserModel } = require('../schema/user')
const console = require('../logger')
const { COLLECTIONS } = require('../config/constant')
const messages = require('../config/messages')

class DbHelper {
  async connect() {
    if (!this.db) {
      try {
        await mongoose.connect(`${process.env.DB_STAGING_URI}`, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        this.db = mongoose.connection
        console.log('MongoClient Connection successfull.')
        return
      } catch (e) {
        console.error('DbHelper Error while connect mongodb ::: ', e)
        throw Error(e)
      }
    }
  }


  async fetchSingleDocument(collection, _id) {
    try {
      let Model
      if (collection == COLLECTIONS.BOOK_COLLECTION_NAME) {
        Model = UserModel;
      }else {
        throw Error(messages.error.INVALID_COLLECTION);
      }
      await this.connect();
      const exist = await Model.findOne({_id:mongoose.Types.ObjectId(_id), isDelete:{$ne:true}});
      if(!exist) return "This Book is not available";
      return await Model.findById({ _id: mongoose.Types.ObjectId(_id) },);
    } catch (e) {
      console.error(
        'DbHelper mongoClient.insertDocumentWithIndex: Error caught,',
        e
      )
      throw Error(e)
    }
  }


  async insertDocument(collection, docObj) {
    try {
      console.log("::::: docObj ::::::", docObj);
      if (Object.keys(docObj).length === 0 && docObj.constructor === Object) {
        throw Error(
          'mongoClient.insertDocumentWithIndex: document is not an object'
        )
      }
      let modelInstance
      if (collection == COLLECTIONS.BOOK_COLLECTION_NAME) {
        modelInstance = new UserModel(docObj)
      } else {
        throw Error(messages.error.INVALID_COLLECTION)
      }
      await this.connect()
      return await modelInstance.save()
    } catch (e) {
      console.error(
        'DbHelper mongoClient.insertDocumentWithIndex: Error caught,',
        e
      )
      throw Error(e)
    }
  }

  async updateDocument(collection, _id, data) {
    try {
      let Model
      if (collection == COLLECTIONS.BOOK_COLLECTION_NAME) {
        Model = UserModel;
      }else {
        throw Error(messages.error.INVALID_COLLECTION);
      }
      await this.connect();
      const exist = await Model.findOne({_id:mongoose.Types.ObjectId(_id), isDelete:{$ne:true}});
      if(!exist) throw "This Book is not available";
      return await Model.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(_id) },
        data,
        { new: true }
      );
    } catch (e) {
      console.error('DbHelper Error ::: ', e);
      throw e;
    }
  }



  async fetchUserList(collection, sorting, skipIndex, limit) {
    try {
      let Model
      if (collection == COLLECTIONS.BOOK_COLLECTION_NAME) {
        Model = UserModel;
      }else {
        throw Error(messages.error.INVALID_COLLECTION);
      }
      await this.connect();
      let bookData = await Model.find({isDelete:{$ne:true}}).sort(sorting).skip(skipIndex).limit(limit);
      return bookData;
    } catch (e) {
      console.error('DbHelper Error while getUserById ::: ', e);
      throw e;
    }
  }

  async deleteDocument(collection, _id) {
    try {
      let Model
      if (collection == COLLECTIONS.BOOK_COLLECTION_NAME) {
        Model = UserModel;
      }else {
        throw Error(messages.error.INVALID_COLLECTION);
      }
      await this.connect()
      const exist = await Model.findOne({_id:mongoose.Types.ObjectId(_id), isDelete:{$ne:true}});
      if(!exist) throw "This Book is not available";
      let bookData = await UserModel.findByIdAndUpdate({_id:_id}, {$set:{isDelete:true}},{ new: true });
      return bookData;
    } catch (e) {
      console.error('DbHelper Error while getUserById ::: ', e);
      throw e;
    }
  }

}

module.exports = {
  DbHelper,
}
