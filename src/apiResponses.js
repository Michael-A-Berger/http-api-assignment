const returnJSON = (rq, rp, statusCode, object) => {
  rp.writeHead(statusCode, { 'Content-Type': 'application/json' });
  rp.write(JSON.stringify(object));
  rp.end();
};

const returnXML = (rq, rp, statusCode, object) => {
  rp.writeHead(statusCode, { 'Content-Type': 'text/xml' });

  const objectKeys = Object.keys(object);
  const objectValues = Object.values(object);

  let xmlToReturn = '<response>';
  for (let num = 0; num < objectKeys.length; num++) {
    xmlToReturn += `<${objectKeys[num]}>${objectValues[num]}</${objectKeys[num]}>`;
  }
  xmlToReturn += '</response>';

  rp.write(xmlToReturn);
  rp.end();
};

const undefinedOrNull = object => (object === null) || (object === undefined);

// success()
const success = (rq, rp, params) => {
  const responseObject = {
    message: 'This is a successful response',
  };

  if (!undefinedOrNull(params.type) && params.type === 'xml') {
    returnXML(rq, rp, 200, responseObject);
  } else {
    returnJSON(rq, rp, 200, responseObject);
  }
};

// badRequest()
const badRequest = (rq, rp, params) => {
  let statusCode = 200;
  const responseObject = {
    message: 'This request has the required parameters',
  };

  if (undefinedOrNull(params.valid) || params.valid !== 'true') {
    responseObject.message = 'Missing valid query parameter set to true';
    responseObject.id = 'badRequest';
    statusCode = 400;
  }

  if (!undefinedOrNull(params.type) && params.type === 'xml') {
    returnXML(rq, rp, statusCode, responseObject);
  } else {
    returnJSON(rq, rp, statusCode, responseObject);
  }
};

// unauthorized()
const unauthorized = (rq, rp, params) => {
  let statusCode = 200;
  const responseObject = {
    message: 'You have successfully viewed the contents',
  };

  if (undefinedOrNull(params.loggedIn) || params.loggedIn !== 'yes') {
    responseObject.message = 'Missing loggedIn query parameter set to yes';
    responseObject.id = 'unauthorized';
    statusCode = 401;
  }

  if (!undefinedOrNull(params.type) && params.type === 'xml') {
    returnXML(rq, rp, statusCode, responseObject);
  } else {
    returnJSON(rq, rp, statusCode, responseObject);
  }
};

// forbidden()
const forbidden = (rq, rp, params) => {
  const responseObject = {
    message: 'You do not have access to this content',
    id: 'forbidden',
  };

  if (!undefinedOrNull(params.type) && params.type === 'xml') {
    returnXML(rq, rp, 403, responseObject);
  } else {
    returnJSON(rq, rp, 403, responseObject);
  }
};

// internal()
const internal = (rq, rp, params) => {
  const responseObject = {
    message: 'Internal Server Error, something went wrong',
    id: 'internalError',
  };

  if (!undefinedOrNull(params.type) && params.type === 'xml') {
    returnXML(rq, rp, 500, responseObject);
  } else {
    returnJSON(rq, rp, 500, responseObject);
  }
};

// notImplemented()
const notImplemented = (rq, rp, params) => {
  const responseObject = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  if (!undefinedOrNull(params.type) && params.type === 'xml') {
    returnXML(rq, rp, 501, responseObject);
  } else {
    returnJSON(rq, rp, 501, responseObject);
  }
};

// notFound()
const notFound = (rq, rp, params) => {
  const responseObject = {
    message: 'The page you were looking for could not be found',
    id: 'notFound',
  };

  if (!undefinedOrNull(params.type) && params.type === 'xml') {
    returnXML(rq, rp, 404, responseObject);
  } else {
    returnJSON(rq, rp, 404, responseObject);
  }
};

// Exports
module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
