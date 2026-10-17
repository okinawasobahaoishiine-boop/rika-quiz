// Read-only by default. Run with --apply only after explicit production approval.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const {execFileSync} = require('child_process');
const root = path.resolve(__dirname, '..');
const densityAssets = fs.existsSync(path.join(root, 'preview/assets/density')) ? fs.readdirSync(path.join(root, 'preview/assets/density')).filter(f => f.endsWith('.png')).map(f => `assets/density/${f}`) : [];
const organicAssets = fs.existsSync(path.join(root, 'preview/assets/organic')) ? fs.readdirSync(path.join(root, 'preview/assets/organic')).filter(f => f.endsWith('.png')).map(f => `assets/organic/${f}`) : [];
const files = ['index.html', 'app.jsx', 'app-config.js', 'learning-state.js', 'explanations.jsx', 'density-lesson.jsx', 'organic-lesson.jsx', 'styles.css', 'quiz-data.js', ...densityAssets, ...organicAssets];
const hash = b => crypto.createHash('sha256').update(b).digest('hex');
const changes = files.filter(f => !fs.existsSync(path.join(root, f)) || hash(fs.readFileSync(path.join(root, f))) !== hash(fs.readFileSync(path.join(root, 'preview', f))));
console.log('本番への反映候補:', changes.length ? changes.join(', ') : 'なし');
if (!process.argv.includes('--apply')) {
  console.log('読み取り確認のみ。本番反映の明示承認後だけ --apply を使ってください。');
  process.exit(0);
}
const dirty = execFileSync('git', ['status', '--porcelain', '--', ...files, 'preview'], {cwd:root,encoding:'utf8'}).trim();
if (dirty) throw new Error('未コミットの本番/テスト版変更があります。先にテスト版を検証・コミットしてください。');
const source = Object.fromEntries(files.map(f => [f, fs.readFileSync(path.join(root, 'preview', f))]));
if (!source['app-config.js'].toString().includes('!SCIENCE_IS_PREVIEW && window.supabase?.createClient')) throw new Error('環境分離ガードが見つかりません。反映中止。');
const before = execFileSync('git', ['rev-parse', 'HEAD'], {cwd:root,encoding:'utf8'}).trim();
console.log('復旧用の反映前コミット:', before);
for (const f of changes) {
  fs.mkdirSync(path.dirname(path.join(root, f)), {recursive:true});
  fs.copyFileSync(path.join(root, 'preview', f), path.join(root, f));
}
console.log('ローカル本番へコピーしました。差分検査・動作確認後に公開してください。自動pushはしません。');
