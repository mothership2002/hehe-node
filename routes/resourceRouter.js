const express = require('express');
const router = express.Router();
const dynamicCore = require('../middleware/dynamicCore');

// pagination?
router.get('/all', (req, res) => {
    res.send(); // 여기에 목록 조회 할 것.
});

router.post('/', (req, res) => {
   req.body;
   // 성공 및 실패 여부 res 담는 방법 찾아야함.
});

router.delete('/:filename', (req, res) => {
    const filename = req.params.filename + extension;
    // 대충 객체값 지우는 로직
    // 파일도 지우는 로직
    res.send();
});



module.exports = router


