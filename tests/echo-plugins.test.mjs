import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUR_URL = 'https://github.com/MmlwrYan/YanMusicPlugins';

const source = JSON.parse(readFileSync(path.join(ROOT, 'echo-plugins.json'), 'utf8'));

test('索引元信息指向自有仓库', () => {
  assert.equal(source.homepage, OUR_URL);
  assert.equal(source.name, 'YanMusic 插件源');
});

test('索引不再引用上游 hoowhoami/EchoMusicPlugins 作为托管仓库', () => {
  const stale = source.plugins.filter((e) => /hoowhoami\/EchoMusicPlugins/i.test(String(e.repo || '')));
  assert.deepEqual(stale.map((e) => e.id), []);
});

test('每条目都有 licenseStatus，且取值在允许集合内', () => {
  for (const e of source.plugins) {
    assert.ok(
      e.licenseStatus === 'licensed' || e.licenseStatus === 'unlicensed',
      `条目 ${e.id} 的 licenseStatus 非法: ${e.licenseStatus}`,
    );
  }
});

test('自托管条目指向本仓库，且 manifest 真实存在并与 id 一致', () => {
  const hosted = source.plugins.filter((e) => e.repo === OUR_URL);
  assert.ok(hosted.length > 0, '应当存在自托管条目');
  for (const e of hosted) {
    assert.equal(e.licenseStatus, 'licensed', `${e.id} 自托管却标为未授权`);
    assert.equal(e.homepage, `${OUR_URL}/tree/main/${e.path}`, `${e.id} 的 homepage 不规范`);
    const manifestPath = path.join(ROOT, e.path, 'manifest.json');
    assert.ok(existsSync(manifestPath), `${e.id} 的 manifest 不存在: ${e.path}`);
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
    assert.equal(manifest.id, e.id, `${e.id} 与 manifest.id 不一致`);
  }
});

test('未授权条目一律不镜像，且不指向本仓库', () => {
  const unlicensed = source.plugins.filter((e) => e.licenseStatus === 'unlicensed');
  assert.ok(unlicensed.length > 0, '当前应当存在未授权条目');
  for (const e of unlicensed) {
    assert.equal(e.mirrored, false, `${e.id} 标为未授权却声明已镜像`);
    assert.notEqual(e.repo, OUR_URL, `${e.id} 标为未授权却指向本仓库`);
    assert.match(String(e.repo), /^https:\/\/github\.com\/[^/]+\/[^/]+$/, `${e.id} 的 repo 不是仓库地址`);
    assert.ok(!e.path || !String(e.path).startsWith('third-party/'), `${e.id} 标为未授权却给了镜像路径`);
  }
});

test('apple-music-lyrics 声明为 AGPL-3.0-only（不是 MIT）', () => {
  const entry = source.plugins.find((e) => e.id === 'apple-music-lyrics');
  assert.ok(entry, '缺少 apple-music-lyrics 条目');
  assert.equal(entry.license, 'AGPL-3.0-only');
  assert.ok(existsSync(path.join(ROOT, 'apple-music-lyrics', 'LICENSE')), 'AGPL 许可证文件必须随包保留');
});

test('已镜像的第三方插件保留其来源仓库许可证文件', () => {
  const required = [
    'third-party/T-T2333/github-accelerator/LICENSE',
    'third-party/T-T2333/github-accelerator/NOTICE',
    'third-party/oneday5799/EchoMusicPlugins/LICENSE',
    'third-party/venti1112/echo_music-blue_archive-theme/LICENSE',
  ];
  for (const rel of required) {
    assert.ok(existsSync(path.join(ROOT, rel)), `缺少许可证文件: ${rel}`);
  }
});
